"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AvatarOtros from "@/components/icons/AvatarOtros";
import Boton from "@/components/buttons/Boton";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Modal from "@/components/layout/Modal";
import DenunciaForm from "@/components/inputs/forms/denuncia-form";

interface ComentarioProps {
    id: string;
    texto: string;
    fecha: Date;
    user: {
        id: string;
        name: string;
        foto: string;
        usuario_verificado: boolean;
    };
    sessionUserId: string | null;
    slug: string | null;
    onResponderClick?: (username: string) => void;
}

export default function Comentario({ id, texto, fecha, user, sessionUserId, slug, onResponderClick }: ComentarioProps) {

    const router = useRouter();

    const fechaFormateada = format(new Date(fecha), "HH:mm'h' - d 'de' MMMM yyyy", { locale: es });

    // Acciones sobre comentarios propios (del usuario en sesión):

    const comentarioPropio = sessionUserId === user.id;

    const handleEliminarComentario = async (slug: string | null, id: string) => {
        const confirmado = window.confirm("¿Estás seguro de que quieres eliminar este comentario?");
        if (!confirmado) return;

        try {
            const res = await fetch(`/api/shares/${slug}/comentarios/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("No se pudo eliminar el comentario.");
            }
        } catch (err) {
            console.error(err);
            alert("Ha ocurrido un error al eliminar el comentario.");
        }
    };

    // Acciones sobre otros comentarios:

    const [mostrarDenuncia, setMostrarDenuncia] = useState(false);

    return (
        <div className="w-full flex flex-col gap-6 p-[10px] pb-10 border-b border-gray-300 dark:border-[var(--gris4)]">

            {/* Caja Superior: */}
            <div className="w-full flex flex-row justify-between items-center gap-4">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-[40px]">
                        <AvatarOtros autor={user} />
                    </div>
                    <p className="font-bold text-[0.9rem] text-[var(--gris4)] dark:text-[var(--gris3)]">@{user.name}</p>
                </div>
                <p className="text-end text-[0.9rem] text-[var(--gris2)] dark:text-[var(--gris3)] font-bold">{fechaFormateada}</p>
            </div>

            {/* Caja Central: */}
            <div className="w-full">
                <p className="dark:text-[var(--gris1)]">{texto}</p>
            </div>

            {/* Caja Inferior: */}

            {!comentarioPropio &&

                <div className="w-full flex flex-row justify-between items-end gap-4">
                    <a href="#" onClick={() => setMostrarDenuncia(true)} className="text-end text-[0.9rem] font-bold underline text-[var(--gris2)] dark:text-[var(--gris3)] hover:text-[var(--gris4)] dark:hover:text-[var(--gris2)] transition ease">Denunciar comentario inapropiado</a>
                    {sessionUserId && <Boton
                        texto="Responder"
                        tamano="pequeno"
                        jerarquia="secundario"
                        onClick={() => onResponderClick?.(user.name)}
                    />}
                </div>

            }

            {comentarioPropio &&
                <div className="w-full flex flex-row justify-end items-center gap-2">
                    <a href="#" onClick={(e) => {
                        e.preventDefault(); // Evita que el enlace recargue o navegue
                        handleEliminarComentario(slug, id);
                    }} className="text-end text-[0.9rem] font-bold underline text-[var(--brand1)]">Eliminar tu comentario</a>
                    <Image
                        src="/iconos/iconos-otros/icono-papelera.svg"
                        alt="Eliminar"
                        width={16}
                        height={16}
                    />
                </div>
            }

            <Modal isOpen={mostrarDenuncia} onClose={() => setMostrarDenuncia(false)}>
                <DenunciaForm
                    slug={slug}
                    idComentario={id}
                    onClose={() => setMostrarDenuncia(false)}
                />
            </Modal>

        </div>
    );
}
