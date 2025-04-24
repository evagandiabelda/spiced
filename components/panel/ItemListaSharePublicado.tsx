"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/layout/Modal";
import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface ItemProps {
    id: string;
    imagen: string;
    autor: string | null;
    titulo: string;
    fecha: Date;
    slug: string;
    onDelete: (id: string) => void;
}

export default function ItemListaSharePublicado({ id, imagen, autor, titulo, fecha, slug, onDelete }: ItemProps) {

    const router = useRouter();
    const objetoFecha = new Date(fecha);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <li className="w-full flex flex-row justify-between items-end gap-12 py-4 border-b border-b-[var(--gris2)] dark:border-b-[var(--negro)]">

            <div className="flex-1 flex flex-row mobile:items-start tablet:items-center gap-4">

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
                    <div className="w-full mobile:hidden tablet:flex flex-row justify-between">
                        <p><span className="text-[var(--gris2)]">@{autor || ""}</span></p>
                        <p><span className="text-[var(--gris2)]">{objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</span></p>
                    </div>
                </div>

            </div>

            <div id="caja-boton" className="mobile:hidden laptop:flex flex-row gap-4">
                <Boton texto="Leer" enlace="#" tamano="pequeno" jerarquia="secundario" onClick={() => router.push(`/share/${slug}`)} />
                <Boton texto="Eliminar" enlace="#" tamano="pequeno" jerarquia="secundario" customColor="var(--brand1)" onClick={() => setIsModalOpen(true)} />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col gap-6">
                    <div className="w-full flex flex-col items-center text-center gap-4">
                        <Image
                            src="/iconos/iconos-genericos/icono-spiced.svg"
                            alt="miniatura"
                            width={15}
                            height={15}
                            className="object-cover"
                        />
                        <h3>Eliminar Share</h3>
                    </div>
                    <p className="text-sm text-center">¿Seguro que quieres eliminar este Share?</p>
                    <div className="flex justify-center gap-2">
                        <Boton texto="Cancelar" jerarquia="secundario" tamano="pequeno" onClick={() => setIsModalOpen(false)} />
                        <Boton texto="Eliminar" jerarquia="primario" tamano="pequeno" onClick={() => onDelete(id)} />
                    </div>
                </div>
            </Modal>

        </li>
    );
};