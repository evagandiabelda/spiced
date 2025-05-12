"use client";

/* SOLO PARA EL PANEL DE ADMIN */

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import ListaSkeleton from "@/components/panel/ListaSkeleton";
import ItemListaComentarios from "./ItemListaComentarios";
import Boton from "@/components/buttons/Boton";
import { DenunciaComentario } from "@prisma/client";

type ComentarioData = {
    id: string;
    texto: string;
    created_at: Date;
    user: {
        name: string;
        usuario_verificado: boolean;
    };
    share: {
        titulo: string;
        img_principal: string;
        slug: string;
    };
    denuncias: DenunciaComentario[];
}

interface ListaComentariosProps {
    numItems?: number;
}

export default function ListaComentarios({ numItems }: ListaComentariosProps) {
    const { data: session } = useSession();
    const [comentarios, setComentarios] = useState<ComentarioData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(numItems || 10);

    useEffect(() => {
        const fetchComentarios = async () => {
            if (session?.user?.userType !== "admin") return; // Evitar la llamada si no es Admin

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/comentarios`);
                if (!response.ok) {
                    throw new Error("Error al recuperar los comentarios.");
                }

                const data = await response.json();
                const comentarios: ComentarioData[] = data.comentarios;

                if (comentarios.length === 0) {
                    setError("Todavía no se ha registrado ningún comentario.");
                    setComentarios([]);
                } else {

                    // Ordenar los comentarios por número de denuncias antes de guardar:
                    const comentariosOrdenados = comentarios.sort((a, b) => b.denuncias.length - a.denuncias.length);

                    // Si no se ha especificado por prop, se establece el número de comentarios a mostrar en base a los comentarios existentes:
                    if (!numItems) {
                        numItems = comentariosOrdenados.length;
                    }

                    // Se guardan los comentarios en el estado:
                    setComentarios(comentariosOrdenados);

                }
            } catch (error) {
                setError("Error cargando los comentarios.");
            } finally {
                setLoading(false);
            }
        };

        fetchComentarios();
    }, [session]); // Se ejecuta solo cuando el usuario cambia

    const handleDelete = async (id: string) => {

        if (session?.user?.userType !== "admin") return;

        try {

            const comentario = comentarios.find((comentario) => comentario.id === id);

            if (!comentario) {
                alert("Comentario no encontrado.");
                return;
            }

            const res = await fetch(`/api/shares/${comentario.share.slug}/comentarios/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Error al eliminar el comentario.");
            }

            setComentarios((prevComentarios) => prevComentarios.filter((comentario) => comentario.id !== id));

            toast.success("Comentario eliminado.")

        } catch (error) {
            toast.error("Hubo un error al eliminar el comentario.");
        }
    };

    if (error) return <p>{error}</p>;

    if (loading) return (
        <div className="w-full flex flex-col gap-8 p-[30px] rounded-xl bg-white dark:bg-[var(--gris4)]">
            <ListaSkeleton />
            <ListaSkeleton />
            <ListaSkeleton />
        </div>
    );

    return (
        <div className="w-full flex flex-col gap-8 px-4 pt-[10px] pb-[24px] rounded-xl bg-white dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--gris4)]">
            {comentarios.length === 0 ? (
                <p className="pt-6 px-4">Todavía no se ha publicado ningún comentario.</p>
            ) : (
                <ul>
                    {comentarios.slice(0, visibleCount).map((comentario) => (
                        <ItemListaComentarios
                            key={comentario.id}
                            id={comentario.id}
                            texto={comentario.texto}
                            fecha={comentario.created_at as Date}
                            user={comentario.user}
                            share={comentario.share}
                            numDenuncias={comentario.denuncias.length}
                            onDelete={() => handleDelete(comentario.id)}
                        />
                    ))}
                </ul>
            )}

            <div className="w-full flex justify-center items-center gap-4 p-8">
                {visibleCount <= comentarios.length &&
                    <Boton
                        texto="Ver más comentarios"
                        tamano="grande"
                        jerarquia="primario"
                        onClick={() => setVisibleCount((prev) => prev + 10)}
                    />
                }
            </div>
        </div>
    );
}
