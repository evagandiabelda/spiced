'use client';

import Image from "next/image";

type AvatarOtrosProps = {
    autor: {
        id: string;
        name: string;
        foto: string | "/iconos/iconos-genericos/icono-usuario-anonimo-header.svg";
        usuario_verificado: boolean;
    };
    customBorder?: string;
};

export default function AvatarOtros({ autor, customBorder }: AvatarOtrosProps) {

    let href = `/perfil/${autor.name}`;

    let colorBorde = "border-[var(--brand1)]"

    if (autor.usuario_verificado) {
        colorBorde = "border-[var(--brand3)]";
    }
    else if (customBorder) {
        colorBorde = customBorder;
    }

    return (
        <div className={`w-full p-1 rounded-full border-[3px] ${colorBorde} overflow-hidden cursor-pointer hover:scale-105 transition ease`}>
            <a href={href} className="block w-full h-full">
                <div className="relative w-full aspect-square rounded-full overflow-hidden">
                    <Image
                        src={autor.foto || "/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"}
                        alt="Avatar"
                        fill
                        className="avatar object-cover"
                    />
                </div>
            </a>
        </div>
    );
};
