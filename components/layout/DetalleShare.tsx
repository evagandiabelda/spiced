"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Avatar from "@/components/icons/Avatar";
import Boton from "@/components/buttons/Boton";
import Tag from "@/components/buttons/Tag";

interface DetalleShareProps {
    titulo: string;
    texto: string;
    img_principal: string;
    img_secundaria: string | null;
    fecha: Date;
    verificado: boolean;
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
}

export default function DetalleShare({ titulo, texto, img_principal, img_secundaria, fecha, verificado, autor, spices, categorias, comentarios, sessionUserId, yaLoSigue }: DetalleShareProps) {

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

    return (
        <div className="w-full flex flex-col items-center gap-16 pb-[160px]">

            {/* CABECERA */}
            <div className="w-full min-h-[500px] max-h-[600px] flex flex-row">
                <div className="relative w-1/2">
                    <Image
                        src={img_principal}
                        alt="miniatura"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="w-1/2 h-full flex flex-col justify-center gap-8 p-20 bg-black/5 dark:bg-white/5">
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

                    <div className="w-full flex flex-col gap-5 border-b border-b-1 border-b-[var(--gris2)] px-2 pb-8">
                        <div className="w-full flex flex-col gap-3">
                            <div className="max-w-[120px]">
                                <a href="#"><Avatar borde="color" foto={autor.foto} /></a>
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

                    <div className="w-full flex flex-col gap-5 border-b border-b-1 border-b-[var(--gris2)] px-2 py-8">
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

                    <div className="inline-block px-2 py-8">
                        <Boton
                            texto="Guardar"
                            enlace="#"
                            tamano="pequeno"
                            jerarquia="secundario"
                            icon="/iconos/iconos-menu/icono-guardado.svg"
                        />
                    </div>

                </div>

                {/* Artículo */}
                <div className="w-full flex flex-col items-start gap-2 gap-4">
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
                    <div className="inline-block px-2 py-8">
                        <Boton
                            texto="Volver al Feed"
                            enlace="/explorar"
                            tamano="pequeno"
                            jerarquia="secundario"
                            icon="/iconos/iconos-otros/icono-arrow-left.svg"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}
