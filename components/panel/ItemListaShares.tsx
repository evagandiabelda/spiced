"use client";

/* SOLO PARA EL PANEL DE ADMIN */

import { useState } from "react";
import Modal from "@/components/layout/Modal";
import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface ItemProps {
    id: string;
    titulo: string;
    texto: string;
    imagen: string;
    fecha: Date;
    slug: string;
    share_verificado: boolean;
    user: {
        name: string;
        usuario_verificado: boolean;
    };
    numDenuncias: number;
    onDelete: (id: string) => void;
}

export default function ItemListaShares({ id, titulo, texto, imagen, fecha, slug, share_verificado, user, numDenuncias, onDelete }: ItemProps) {

    const objetoFecha = new Date(fecha);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getExcerpt = (text: string, maxLength = 90) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <li className="w-full flex flex-col gap-6 px-4 py-10 border-b border-b-[var(--gris2)] dark:border-[var(--gris4)]">

            <div id="caja-autor-fecha" className="w-full flex mobile:flex-col-reverse tablet:flex-row tablet:justify-between tablet:items-center px-4 mobile:gap-4 tablet:gap-8">
                <div className="flex flex-row gap-1">
                    {user.usuario_verificado &&
                        <Image
                            src="/iconos/iconos-otros/icono-verificado-relleno.svg"
                            alt="miniatura-share"
                            width={14}
                            height={14}
                        />
                    }
                    <p className="text-[0.8rem] text-[var(--gris3)]"><span className="font-bold not-italic">@{user.name}</span> publica:</p>
                </div>
                <p className="text-[0.8rem] text-[var(--gris3)] text-right">{objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</p>
            </div>

            <div id="caja-share" className="px-4 py-3 rounded-xl bg-[var(--gris1)] dark:bg-[var(--gris4)]">
                <a
                    href={`/share/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex flex-1 items-center gap-4 p-4 rounded-xl hover:bg-[var(--gris1)] dark:hover:bg-[var(--gris4)] cursor-pointer"
                >
                    <div className="relative w-[4rem] h-[4rem]">
                        <Image
                            src={imagen}
                            alt="miniatura-share"
                            fill
                            className="rounded-xl object-cover"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-3">

                        <div className="w-full flex flex-row items-center gap-2">
                            <p className="font-bold">{titulo}</p>
                            {share_verificado &&
                                <Image
                                    src="/iconos/iconos-otros/icono-verificado-relleno.svg"
                                    alt="miniatura-share"
                                    width={14}
                                    height={14}
                                />
                            }
                        </div>

                        <p>{getExcerpt(texto)}</p>

                    </div>
                </a>
            </div>

            <div id="caja-denuncias" className="w-full flex mobile:flex-col laptop:flex-row laptop:justify-end laptop:items-center gap-2">

                <div className="flex flex-row justify-end items-center gap-4 px-4">
                    {numDenuncias > 0 ?
                        <p className="text-[0.8rem] font-bold text-white px-3 py-1 rounded-xl bg-[#D84C60]">{numDenuncias} denuncias</p>
                        :
                        <p className="text-[0.8rem] font-bold text-white px-3 py-1 rounded-xl bg-[var(--gris2)]">{numDenuncias} denuncias</p>
                    }

                    <Boton texto="Eliminar Share" tamano="pequeno" jerarquia="primario" onClick={() => setIsModalOpen(true)} />
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

            </div>

        </li>
    );
};