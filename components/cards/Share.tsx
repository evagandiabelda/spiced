"use client";

import Image from "next/image";
import Tag from "@/components/buttons/Tag";

interface ShareProps {
    imagen: string;
    verificado: boolean;
    user: string | null;
    foto: string;
    categorias: string[];
    spices: string[];
    titulo: string;
    extracto: string;
    onClick: () => void;
}

export default function Share({ imagen, verificado, user, foto, categorias, spices, titulo, extracto, onClick }: ShareProps) {

    return (
        <div onClick={onClick} className="w-full flex flex-col rounded-[1.8rem] p-[10px] bg-white dark:bg-[var(--gris4)] dark:border-2 dark:border-[var(--gris3)] hover:drop-shadow-xl transition ease cursor-pointer">

            <div id="caja-imagen" className="relative w-full min-h-[200px] rounded-tl-[1.2rem] rounded-tr-[1.2rem] rounded-bl-[1.2rem] overflow-hidden">

                {verificado &&
                    <div id="caja-verificado" className="absolute top-0 left-0 bg-white p-[0.7rem] rounded-br-[1.2rem] z-10">
                        <Image
                            src="/iconos/iconos-otros/icono-verificado-relleno.svg"
                            alt="Verificado"
                            width={20}
                            height={20}
                        />
                    </div>
                }

                <Image
                    src={imagen}
                    alt="miniatura"
                    fill
                    sizes="100%"
                    className="object-cover"
                />

            </div>

            <div id="caja-contenido" className="w-full flex flex-col py-4 gap-3">

                <div id="caja-usuario" className="w-full flex flex-row justify-end items-center gap-2 py-1 px-2">
                    <span className="text-right text-[0.9rem] opacity-50">@{user}</span>
                    <div id="caja-imagen" className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            src={foto}
                            alt="miniatura"
                            fill
                            sizes="100%"
                            className="object-cover"
                        />
                    </div>
                </div>

                {categorias.length > 0 && (
                    <div id="caja-categorias" className="w-full flex flex-row justify-start items-center gap-1 px-2">
                        <span className="text-[0.9rem] font-bold opacity-30">
                            {categorias[0]}
                        </span>
                        {categorias.length > 1 && (
                            <span className="text-[0.9rem] font-bold opacity-30">
                                ({categorias.length - 1} más)
                            </span>
                        )}
                    </div>
                )}

                <div id="caja-textos" className="w-full flex flex-col items-start gap-4 pt-4 pb-3 px-2 border-t border-t-1 border-t-[var(--gris2)] dark:border-t-[var(--gris5)]">
                    <h4 className="text-left">{titulo}</h4>
                    <p className="text-left text-[var(--gris3)] text-[0.9rem] opacity-80 dark:opacity-50">{extracto}</p>
                </div>

                {spices.length > 0 && (
                    <div id="caja-spices" className="w-full flex flex-row justify-start items-center gap-1 px-2">
                        {spices.slice(0, 3).map((spice, index) => (
                            <Tag key={index} nombre={spice} tamano="pequeno" isActive={true} />
                        ))}
                        {spices.length > 3 && (
                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold text-sm">
                                +
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
