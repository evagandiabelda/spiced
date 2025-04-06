"use client";

import Image from "next/image";

interface ShareProps {
    imagen: string;
    user: string | null;
    foto: string;
    categorias: string[];
    spices: string[];
    titulo: string;
    extracto: string;
    onClick: () => void;
}

export default function Share({ imagen, user, foto, categorias, spices, titulo, extracto, onClick }: ShareProps) {

    return (
        <div onClick={onClick} className="min-w-col2 w-full flex flex-col rounded-[1.8rem] p-[10px] bg-white dark:bg-[var(--gris4)] dark:border-2 dark:border-[var(--gris3)] hover:scale-[1.01] transition ease cursor-pointer">
            <div id="caja-imagen" className="relative w-full min-h-[300px] rounded-tl-[1.2rem] rounded-tr-[1.2rem] rounded-bl-[1.2rem] overflow-hidden">
                <Image
                    src={imagen}
                    alt="miniatura"
                    fill
                    sizes="100%"
                    className="object-cover"
                />
            </div>
            <div id="caja-textos" className="w-full flex flex-col">
                <div className="w-full flex flex-row justify-end items-center gap-2 border-b border-b-1 border-b-[var(--gris2)] dark:border-b-[var(--gris5)] py-6 px-4">
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
                <div className="w-full flex flex-col items-start gap-4 pt-6 pb-3 px-4">
                    <h4 className="text-left">{titulo}</h4>
                    <span className="text-left text-[var(--gris2)] opacity-80 dark:opacity-50">{extracto}</span>
                </div>
            </div>
        </div>
    );
}
