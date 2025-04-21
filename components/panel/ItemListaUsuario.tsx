"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AvatarOtros from "@/components/icons/AvatarOtros";
import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface ItemProps {
    id: string;
    name: string;
    foto: string;
    usuario_verificado: boolean;
    fecha: Date;
    numShares: number;
    numComentarios: number;
    numSeguidores: number;
    numCategorias: number;
    numSpices: number;
    numDenunciasHechas: number;
    numDenunciasRecibidas: number;
    onDelete?: (name: string, id: string) => void;
}

const ItemListaUsuario = ({ id, name, foto, usuario_verificado, fecha, numShares, numComentarios, numSeguidores, numCategorias, numSpices, numDenunciasHechas, numDenunciasRecibidas, onDelete }: ItemProps) => {

    const router = useRouter();
    const objetoFecha = new Date(fecha);
    const autor = {
        id: id,
        name: name,
        foto: foto,
        usuario_verificado: usuario_verificado,
    }

    return (
        <li className="w-full flex flex-col gap-3 px-4 pt-4 pb-8 border-b border-b-1 border-[var(--gris1)] dark:border-[var(--gris4)]">

            <div onClick={() => router.push(`/perfil/${name}`)} className="w-full flex mobile:flex-col laptop:flex-row justify-between mobile:gap-8 laptop:gap-16 rounded-xl p-4 hover:bg-[var(--gris1)] dark:hover:bg-[var(--gris4)] cursor-pointer">

                <div className="mobile:w-full laptop:w-1/2 flex flex-row gap-4">

                    <div id="caja-avatar" className="relative w-[3rem] h-[3rem]">
                        <AvatarOtros
                            autor={autor}
                        />
                    </div>

                    <div id="caja-textos" className="flex-1 flex flex-col gap-2">
                        <div className="w-full flex flex-row gap-2">
                            <p className="font-bold">{name}</p>
                            {usuario_verificado &&
                                <Image
                                    src="/iconos/iconos-otros/icono-verificado-relleno.svg"
                                    alt='usuario verificado'
                                    width={14}
                                    height={14}
                                />
                            }
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <p><span className="text-[var(--gris3)]">Registrado: {objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</span></p>
                        </div>
                    </div>

                </div>

                <div id="caja-verificado" className="flex flex-col items-end gap-4">
                    <div className='w-full flex flex-wrap justify-end items-center gap-2'>
                        <p className="text-[0.7rem] font-bold dark:text-[var(--gris5)] px-3 py-1 rounded-xl bg-[var(--tea)] dark:opacity-60">{numShares} Shares publicados</p>
                        <p className="text-[0.7rem] font-bold dark:text-[var(--gris5)] px-3 py-1 rounded-xl bg-[var(--toc)] dark:opacity-60">{numComentarios} comentarios</p>
                        <p className="text-[0.7rem] font-bold dark:text-[var(--gris5)] px-3 py-1 rounded-xl bg-[var(--tag)] dark:opacity-60">{numSeguidores} seguidores</p>
                        <p className="text-[0.7rem] font-bold dark:text-[var(--gris5)] px-3 py-1 rounded-xl bg-[var(--tpa)] dark:opacity-60">{numSpices} spices</p>
                        <p className="text-[0.7rem] font-bold dark:text-[var(--gris5)] px-3 py-1 rounded-xl bg-[var(--tep)] dark:opacity-60">{numCategorias} categorías</p>
                        <p className="text-[0.7rem] font-bold dark:text-[var(--gris5)] px-3 py-1 rounded-xl bg-[var(--te)] dark:opacity-60">{numDenunciasHechas} denuncias hechas</p>
                        <p className="text-[0.7rem] font-bold dark:text-[var(--gris5)] px-3 py-1 rounded-xl bg-[var(--adi)] dark:opacity-60">{numDenunciasRecibidas} denuncias recibidas</p>
                    </div>
                </div>

            </div>

            {onDelete &&
                <div className="w-full flex justify-end items-center gap-4 px-4">
                    <Boton texto="Eliminar usuario" enlace="#" tamano="pequeno" jerarquia="primario" onClick={() => onDelete(name, id)} />
                </div>
            }

        </li>
    );
};

export default ItemListaUsuario;
