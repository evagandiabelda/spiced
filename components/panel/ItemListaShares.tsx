"use client";

/* SOLO PARA EL PANEL DE ADMIN */

import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface ItemProps {
    id: string;
    titulo: string;
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

const ItemListaShares = ({ id, titulo, imagen, fecha, slug, share_verificado, user, numDenuncias, onDelete }: ItemProps) => {

    const objetoFecha = new Date(fecha);

    return (
        <li className="w-full flex flex-col gap-6 px-4 py-10 border-b border-b-[var(--gris2)] dark:border-b-[var(--negro)]">

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

            <div id="caja-share" className="px-4 py-3 rounded-xl bg-[var(--gris1)]">
                <a
                    href={`/share/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex flex-1 items-center gap-4 p-4 rounded-xl hover:bg-[var(--gris1)] cursor-pointer"
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
                        <p className="font-bold">{titulo}</p>
                        {share_verificado &&
                            <div className="w-full flex flex-row items-center gap-2">
                                <Image
                                    src="/iconos/iconos-otros/icono-verificado-relleno.svg"
                                    alt="miniatura-share"
                                    width={14}
                                    height={14}
                                />
                                <p className="text-[0.8rem] texto-[var(--gris3)]">Share verificado</p>
                            </div>
                        }
                    </div>
                </a>
            </div>

            <div id="caja-denuncias" className="w-full flex mobile:flex-col laptop:flex-row laptop:justify-end laptop:items-center gap-4">

                <div className="flex flex-row justify-end items-center gap-6 px-4">
                    {numDenuncias > 0 ?
                        <p className="text-[0.8rem] font-bold text-white px-3 py-1 rounded-xl bg-[#D84C60]">{numDenuncias} denuncias</p>
                        :
                        <p className="text-[0.8rem] font-bold text-white px-3 py-1 rounded-xl bg-[var(--gris2)]">{numDenuncias} denuncias</p>
                    }

                    <Boton texto="Eliminar" tamano="grande" jerarquia="secundario" onClick={() => onDelete(id)} />
                </div>

            </div>

        </li>
    );
};

export default ItemListaShares;
