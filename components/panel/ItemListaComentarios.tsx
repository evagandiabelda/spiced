"use client";

/* SOLO PARA EL PANEL DE ADMIN */

import { useState } from "react";
import Modal from "@/components/layout/Modal";
import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface ItemProps {
    id: string;
    texto: string;
    fecha: Date;
    user: {
        name: string;
        usuario_verificado: boolean;
    };
    share: {
        titulo: string;
        img_principal: string;
        slug: string;
    };
    numDenuncias: number;
    onDelete: (id: string) => void;
}

export default function ItemListaComentarios({ id, texto, fecha, user, share, numDenuncias, onDelete }: ItemProps) {

    const objetoFecha = new Date(fecha);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <li className="w-full flex flex-col gap-6 px-4 mobile:py-6 tablet:py-10 border-b border-b-[var(--gris2)] dark:border-[var(--gris4)]">

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
                    <p className="text-[0.8rem] text-[var(--gris3)] dark:text-[var(--gris3)]"><span className="font-bold not-italic dark:text-[var(--gris3)]">@{user.name}</span> comenta:</p>
                </div>
                <p className="text-[0.8rem] text-[var(--gris3)] text-right">{objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</p>
            </div>

            <div id="caja-comentario" className="p-4 rounded-xl bg-[var(--gris1)] dark:bg-[var(--gris4)]">
                <p className="text-[0.9rem]"><span>{texto}</span></p>
            </div>

            <div id="caja-share-denuncias" className="w-full flex mobile:flex-col laptop:flex-row laptop:justify-between laptop:items-center gap-4">

                <a
                    href={`/share/${share.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex flex-1 gap-3 mobile:p-2 tablet:p-4 rounded-xl hover:bg-[var(--gris1)] dark:hover:bg-[var(--gris4)] cursor-pointer"
                >
                    <div className="relative w-[3rem] h-[3rem]">
                        <Image
                            src={share.img_principal}
                            alt="miniatura-share"
                            fill
                            className="rounded-xl object-cover"
                        />
                    </div>
                    <div className="w-full flex flex-col flex-1 gap-2">
                        <p className="text-[0.8rem] dark:text-[var(--gris3)]">En el Share:</p>
                        <p className="text-[0.8rem] font-bold dark:text-[var(--gris3)]">{share.titulo}</p>
                    </div>
                </a>

                <div className="flex flex-row justify-end items-center gap-6 px-4">
                    {numDenuncias > 0 ?
                        <p className="text-[0.8rem] font-bold text-white px-3 py-1 rounded-xl bg-[#D84C60]">{numDenuncias} denuncias</p>
                        :
                        <p className="text-[0.8rem] font-bold text-white px-3 py-1 rounded-xl bg-[var(--gris2)] dark:bg-[var(--gris3)]">{numDenuncias} denuncias</p>
                    }

                    <Boton texto="Eliminar" tamano="grande" jerarquia="secundario" onClick={() => setIsModalOpen(true)} />
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
                            <h3>Eliminar Comentario</h3>
                        </div>
                        <p className="text-sm text-center">¿Seguro que quieres eliminar este comentario?</p>
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