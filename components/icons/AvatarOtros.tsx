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
        <div className={`p-1 rounded-full border-[3px] ${colorBorde} overflow-hidden cursor-pointer hover:scale-105 transition ease`}>
            <div className="rounded-full overflow-hidden">
                <a href={href}>
                    <Image
                        src={autor.foto || "/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"}
                        width={200}
                        height={200}
                        alt="avatar"
                    />
                </a>
            </div>
        </div>
    );
};
