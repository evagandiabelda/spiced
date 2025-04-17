"use client";

import React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import AvatarOtros from "@/components/icons/AvatarOtros";
import Boton from "@/components/buttons/Boton";
import Tag from "@/components/buttons/Tag";
import ComentarioForm from "@/components/inputs/forms/comentario-form";
import Comentario from "@/components/cards/Comentario";
import Modal from "@/components/layout/Modal";
import DenunciaForm from "@/components/inputs/forms/denuncia-form";

interface DetalleShareProps {
    id: string;
    titulo: string;
    texto: string;
    img_principal: string;
    img_secundaria: string | null;
    fecha: Date;
    verificado: boolean;
    slug: string | null;
    autor: {
        id: string;
        name: string;
        foto: string;
        usuario_verificado: boolean;
    };
    spices: {
        spice: {
            id: string;
            nombre: string;
        };
    }[];
    categorias: {
        categoria: {
            id: string;
            nombre: string;
        };
    }[];
    comentarios: {
        id: string;
        texto: string;
        created_at: Date;
        user: {
            id: string;
            name: string;
            foto: string;
            usuario_verificado: boolean;
        };
    }[];
    sessionUserId: string | null;
    yaLoSigue: boolean;
    estaGuardado: boolean;
}

export default function DetalleShare({ id, titulo, texto, img_principal, img_secundaria, fecha, verificado, slug, autor, spices, categorias, comentarios, sessionUserId, yaLoSigue, estaGuardado }: DetalleShareProps) {

    // Determinar si el usuario en sesión sigue al autor de Share. Gestionar la acción de seguir / dejar de seguir:

    const [isFollowing, setIsFollowing] = useState(yaLoSigue);

    const handleToggleFollow = async () => {
        try {
            const response = await fetch("/api/users/me/siguiendo", {
                method: isFollowing ? "DELETE" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ seguido_id: autor.id }), // el ID del autor del share
            });

            if (!response.ok) {
                throw new Error("Error en la petición.");
            }

            setIsFollowing(!isFollowing); // Invertimos el estado
        } catch (error) {
            console.error("Error al seguir/dejar de seguir al autor del Share.", error);
        }
    }

    // Determinar si el usuario en sesión ha guardado anteriormente el Share. Gestionar la acción de guardar / olvidar:

    const [guardado, setGuardado] = useState(estaGuardado);

    const handleToggleGuardado = async () => {
        try {
            const res = await fetch(`/api/users/me/shares/guardados`, {
                method: guardado ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ share_id: id }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Error al guardar/guardar el Share.')
            }

            setGuardado(!guardado)
        } catch (error: any) {
            console.error("Error al guardar/olvidar el Share.", error);
        }
    }

    // Gestionar la acción de Denunciar el Share:

    const [mostrarDenuncia, setMostrarDenuncia] = useState(false);

    // Gestionar la acción de responder a otro comentario:

    const comentarioFormRef = useRef<HTMLDivElement>(null);
    const [respondiendoA, setRespondiendoA] = useState<string | null>(null);

    const handleResponderClick = (username: string) => {
        setRespondiendoA(username);
        comentarioFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }


    return (
        <div className="w-full flex flex-col items-center gap-16 pb-[160px]">

            {/* CABECERA */}
            <div className="w-full min-h-[500px] max-h-[600px] flex flex-row">
                <div className="relative w-2/3">
                    <Image
                        src={img_principal}
                        alt="miniatura"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="w-full h-full flex flex-col justify-center gap-8 p-20 bg-black/5 dark:bg-white/5">
                    <div className="flex flex-row gap-4 items-center">
                        <Image
                            src="/iconos/iconos-genericos/icono-spiced.svg"
                            alt="miniatura"
                            width={15}
                            height={15}
                            className="object-cover"
                        />
                        <h4>{categorias.map(({ categoria }) => (
                            categoria.nombre
                        )).join(", ")}</h4>
                    </div>
                    <h1>{titulo}</h1>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="w-full flex flex-row gap-col1 px-col2">

                {/* Sidebar */}
                <div className="w-col3 flex flex-col gap-2">

                    <div className="w-full flex flex-col gap-5 border-b border-b-1 border-b-[var(--gris2)] px-2 pb-12">
                        <div className="w-full flex flex-col gap-3">
                            <div className="max-w-[120px]">
                                <AvatarOtros autor={autor} />
                            </div>
                            <div className="flex flex-row gap-2 pl-2">
                                <a href="#"><h4>@{autor.name}</h4></a>
                                {autor.usuario_verificado && <Image
                                    src="/iconos/iconos-otros/icono-verificado-relleno2.svg"
                                    alt="Verificado"
                                    width={16}
                                    height={16}
                                />}
                            </div>
                        </div>
                        {sessionUserId && <Boton
                            texto={isFollowing ? "Dejar de seguir" : "Seguir contenido"}
                            onClick={handleToggleFollow}
                            tamano="pequeno"
                            jerarquia={isFollowing ? "secundario" : "primario"}
                        />}
                    </div>

                    <div className="w-full flex flex-col gap-5 border-b border-b-1 border-b-[var(--gris2)] px-2 pt-8 pb-12">
                        <div className="w-full flex flex-col gap-3">
                            <h4 className="pl-2">Sobre este share:</h4>
                        </div>
                        <div className="w-full flex flex-col gap-4 px-2">
                            <div className="flex flex-row gap-2">
                                <a href="#"><p className="font-bold text-[var(--gris4)] text-[0.9rem]">Verificado</p></a>
                                {verificado && <Image
                                    src="/iconos/iconos-otros/icono-verificado-relleno2.svg"
                                    alt="Verificado"
                                    width={16}
                                    height={16}
                                />}
                            </div>
                            <div>
                                <p className="font-bold text-[0.8rem] text-[var(--gris2)]">Publicado el:</p>
                                <p className="font-bold text-[0.8rem] text-[var(--gris2)]">
                                    {fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {spices.map(({ spice }) => (
                                    <Tag key={spice.id} nombre={spice.nombre} tamano="pequeno" isActive={true} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-6 px-2 py-8">
                        {sessionUserId &&
                            <a href="#" onClick={() => setMostrarDenuncia(true)} className="text-[0.8rem] font-bold underline text-[var(--gris2)] hover:text-[var(--gris4)] transition ease">Denunciar contenido inapropiado</a>
                        }
                        {sessionUserId && <Boton
                            texto={guardado ? "Olvidar" : "Guardar"}
                            onClick={handleToggleGuardado}
                            tamano="pequeno"
                            jerarquia={guardado ? "secundario" : "primario"}
                            icon="/iconos/iconos-menu/icono-guardado.svg"
                        />}
                    </div>

                </div>

                {/* Artículo */}
                <div className="w-full flex flex-col items-start gap-4">
                    {texto.split("\n").map((parrafo, index) => (
                        <React.Fragment key={index}>
                            {/* Renderizamos el primer párrafo + la imagen secundaria (si hay) */}
                            {index === 1 && img_secundaria && (
                                <div className="relative w-full h-[300px] my-8">
                                    <Image
                                        src={img_secundaria}
                                        alt="imagen secundaria"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            {/* Renderizamos el resto de párrafos */}
                            <p className="text-[1.2rem]">{parrafo}</p>
                        </React.Fragment>
                    ))}
                    <div className="inline-block px-2 pt-8 pb-20">
                        <Boton
                            texto="Volver al Feed"
                            enlace="/explorar"
                            tamano="pequeno"
                            jerarquia="secundario"
                            icon="/iconos/iconos-otros/icono-arrow-left.svg"
                        />
                    </div>

                    {/* Comentarios */}
                    <div className="w-full flex flex-col items-start gap-16 py-12 border-t border-gray-400">

                        {sessionUserId &&
                            <div ref={comentarioFormRef} className="w-full">
                                <ComentarioForm
                                    slug={slug}
                                    usernameRespondiendoA={respondiendoA}
                                />
                            </div>
                        }

                        <div className="w-full flex flex-col items-start gap-8">
                            {comentarios.map((comentario, index) => (
                                <Comentario
                                    key={index}
                                    id={comentario.id}
                                    texto={comentario.texto}
                                    fecha={comentario.created_at}
                                    user={comentario.user}
                                    sessionUserId={sessionUserId}
                                    slug={slug}
                                    onResponderClick={handleResponderClick}
                                />
                            ))}
                        </div>

                    </div>

                </div>

            </div>

            <Modal isOpen={mostrarDenuncia} onClose={() => setMostrarDenuncia(false)}>
                <DenunciaForm
                    slug={slug}
                    onClose={() => setMostrarDenuncia(false)}
                />
            </Modal>

        </div>
    );
}
