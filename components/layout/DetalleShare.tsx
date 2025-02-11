"use client";

import React from "react";
import Image from "next/image";
import Avatar from "@/components/icons/Avatar";
import Boton from "@/components/buttons/Boton";

interface DetalleShareProps {
    titulo: string;
    texto: string;
    img_principal: string;
    img_secundaria: string | null;
    fecha: Date;
    user: {
        name: string;
        foto: string;
    }
}

export default function DetalleShare({ titulo, texto, img_principal, img_secundaria, fecha, user }: DetalleShareProps) {

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
                        <h4>Compartiendo experiencias</h4>
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
                                <Avatar borde="color" foto={user.foto} />
                            </div>
                            <h4 className="pl-2">@{user.name}</h4>
                        </div>
                        <Boton
                            texto="Seguir contenido"
                            enlace="#"
                            tamano="pequeno"
                            jerarquia="primario"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-5 border-b border-b-1 border-b-[var(--gris2)] px-2 py-8">
                        <div className="w-full flex flex-col gap-3">
                            <h4 className="pl-2">Sobre este share:</h4>
                        </div>
                        <div className="w-full px-2">
                            <p className="font-bold text-[0.8rem] text-[var(--gris2)]">Publicado el:</p>
                            <p className="font-bold text-[0.8rem] text-[var(--gris2)]">
                                {fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
                            </p>
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
                            enlace="/feed"
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
