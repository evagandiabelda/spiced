'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";

type BordeProps = {
    borde: "blanco" | "color";
};

const Avatar = ({ borde }: BordeProps) => {
    const { data: session } = useSession();
    const userPhoto = session?.user?.foto || "/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"; // Imagen por defecto

    const colorBorde = borde === "blanco" ? "border-white" : "border-[var(--brand1)]";

    return (
        <div className={`p-1 rounded-full border-[3px] ${colorBorde} overflow-hidden cursor-pointer hover:scale-105 transition ease`}>
            <div className="rounded-full overflow-hidden">
                <Image
                    src={userPhoto}
                    width={200}
                    height={200}
                    alt="avatar"
                />
            </div>
        </div>
    );
};

export default Avatar;
