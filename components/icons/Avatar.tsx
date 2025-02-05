'use client';

import Image from "next/image";

type borde = {
    borde: "blanco" | "color";
}

const Avatar = ({ borde }: borde) => {

    const colorBorde = borde === "blanco" ? "border-white" : "border-[var(--brand1)]";

    return (
        <div className={`p-1 rounded-full border-[3px] ${colorBorde} cursor-pointer hover:scale-110 transition ease`}>
            <Image
                src="/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"
                width={100}
                height={100}
                alt="avatar"
            />
        </div>
    );
};

export default Avatar;
