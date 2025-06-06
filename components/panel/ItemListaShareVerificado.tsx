"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface ItemProps {
    id: string;
    imagen: string;
    user?: string | null;
    titulo: string;
    fecha: Date;
    slug: string;
}

export default function ItemListaShareVerificado({ id, imagen, user = "Usuario desconocido", titulo, fecha, slug }: ItemProps) {

    const router = useRouter();
    const objetoFecha = new Date(fecha);

    return (
        <li className="w-full flex mobile:flex-col laptop:flex-row laptop:justify-between laptop:items-end mobile:gap-6 laptop:gap-12 py-4 border-b border-b-[var(--gris2)] dark:border-b-[var(--negro)]">

            <div className="flex-1 flex flex-row gap-4">

                <div id="caja-miniatura" className="relative w-[3rem] h-[3rem]">
                    <Image
                        src={imagen}
                        alt="miniatura"
                        fill
                        className="object-cover rounded-xl"
                    />
                </div>

                <div id="caja-textos" className="flex-1 flex flex-col justify-between gap-2">
                    <div className="w-full flex flex-row">
                        <p className="font-bold">{titulo}</p>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <p><span className="text-[var(--gris2)]">{user || "Usuario desconocido"}</span></p>
                        <p><span className="text-[var(--gris2)]">{objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</span></p>
                    </div>
                </div>

            </div>

            <div id="caja-boton" className="flex flex-row justify-end gap-4">
                <Boton texto="Ver" enlace="#" tamano="pequeno" jerarquia="secundario" onClick={() => router.push(`/share/${slug}`)} />
            </div>

        </li>
    );
};