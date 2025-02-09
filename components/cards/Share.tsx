"use client";

import Image from "next/image";

interface ShareProps {
    imagen: string;
    user: string | null;
    foto: string;
    titulo: string;
    extracto: string;
}

export default function Share({ imagen, user = "Usuario desconocido", foto, titulo, extracto }: ShareProps) {

    return (
        <div className="min-w-col2 max-w-col3 flex flex-col justify-between rounded-[1.2rem] p-[20px] bg-white dark:bg-[var(--gris4)] dark:border-2 dark:border-[var(--tdah)] cursor-pointer">
            <div id="caja-imagen" className="relative w-full h-[300px] rounded-[0.6rem] overflow-hidden">
                <Image
                    src={imagen}
                    alt="miniatura"
                    fill
                    className="object-cover"
                />
            </div>
            <div id="caja-textos" className="w-full flex flex-col">
                <div className="w-full flex flex-row justify-end items-center gap-2 border-b border-b-1 border-b-[var(--gris2)] py-6 px-4">
                    <p className="text-right">@{user}</p>
                    <div id="caja-imagen" className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            src={foto}
                            alt="miniatura"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col items-start gap-3 pt-6 pb-3 px-4">
                    <h4 className="text-left">{titulo}</h4>
                    <p className="text-left">{extracto}</p>
                </div>
            </div>
        </div>
    );
}
