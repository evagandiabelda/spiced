'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type AvatarPropioProps = {
    customBorder?: string;
    foto?: string;
    disableOnClick?: boolean;
};

export default function AvatarPropio({ customBorder, foto, disableOnClick }: AvatarPropioProps) {

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
        <div className={`w-full p-1 rounded-full border-[3px] ${colorBorde} overflow-hidden cursor-pointer hover:scale-105 transition ease`}>
            {disableOnClick
                ? <div className="block w-full h-full">
                    <div className="relative w-full aspect-square rounded-full overflow-hidden">
                        <Image
                            src={src}
                            alt="Avatar"
                            fill
                            className="avatar object-cover"
                        />
                    </div>
                </div>
                : <a href={href} className="block w-full h-full">
                    <div className="relative w-full aspect-square rounded-full overflow-hidden">
                        <Image
                            src={src}
                            alt="Avatar"
                            fill
                            className="avatar object-cover"
                        />
                    </div>
                </a>
            }

        </div>
    );
};
