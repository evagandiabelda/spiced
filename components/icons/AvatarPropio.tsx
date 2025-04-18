'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type AvatarPropioProps = {
    customBorder?: string;
    foto?: string;
};

const AvatarPropio = ({ customBorder, foto }: AvatarPropioProps) => {

    const { data: session } = useSession();
    const userType = session?.user.userType;
    const userPhoto = session?.user?.foto || "/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"; // Imagen por defecto

    let colorBorde = "border-white";
    let href = "#";

    if (userType === "standard") {
        colorBorde = "border-[var(--brand1)]";
        href = "/panel-estandar";
    }
    else if (userType === "expert") {
        colorBorde = "border-[var(--brand3)]";
        href = "/panel-experto";
    }
    else if (userType === "admin") {
        colorBorde = "border-[var(--brand4)]";
        href = "/panel-admin";
    }
    else {
        colorBorde = "border-[var(--brand1)]";
        href = "/login";
    }

    if (customBorder) {
        colorBorde = customBorder;
    }

    const src = foto || userPhoto;

    return (
        <div className={`p-1 rounded-full border-[3px] ${colorBorde} overflow-hidden cursor-pointer hover:scale-105 transition ease`}>
            <div className="rounded-full overflow-hidden">
                <a href={href}>
                    <Image
                        src={src}
                        width={200}
                        height={200}
                        alt="avatar"
                    />
                </a>
            </div>
        </div>
    );
};

export default AvatarPropio;
