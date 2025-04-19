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
    onDelete?: (name: string, id: string) => void;
}

const ItemListaUsuarioRegistrado = ({ id, name, foto, usuario_verificado, fecha, onDelete }: ItemProps) => {

    const router = useRouter();
    const objetoFecha = new Date(fecha);
    const autor = {
        id: id,
        name: name,
        foto: foto,
        usuario_verificado: usuario_verificado,
    }

    return (
        <li className="w-full flex flex-row justify-between items-center gap-12 rounded-xl p-4 hover:bg-[var(--gris1)] dark:hover:bg-[var(--gris4)] cursor-pointer" onClick={() => router.push(`/perfil/${name}`)}>

            <div className="flex-1 flex flex-row mobile:items-start tablet:items-center gap-4">

                <div id="caja-avatar" className="relative w-[3rem] h-[3rem]">
                    <AvatarOtros
                        autor={autor}
                    />
                </div>

                <div id="caja-textos" className="flex-1 flex flex-col justify-between gap-2">
                    <div className="w-full flex flex-row">
                        <p className="font-bold">{name}</p>
                    </div>
                    <div className="w-full mobile:hidden tablet:flex flex-row justify-between">
                        <p><span className="text-[var(--gris2)] opacity-60">{objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</span></p>
                    </div>
                </div>

            </div>

            <div id="caja-verificado" className="flex flex-row gap-4">
                {usuario_verificado &&
                    <div className='w-full flex flex-row justify-end items-center gap-2'>
                        <p className='mobile:hidden tablet:block text-[0.8rem] text-[var(--gris2)] font-bold'>Verificado</p>
                        <Image
                            src="/iconos/iconos-otros/icono-verificado-relleno2.svg"
                            alt='usuario verificado'
                            width={14}
                            height={14}
                            className='opacity-50'
                        />
                    </div>
                }
                {onDelete &&
                    <Boton texto="Eliminar" enlace="#" tamano="pequeno" jerarquia="secundario" customColor="var(--brand1)" onClick={() => onDelete(name, id)} />
                }
            </div>

        </li>
    );
};

export default ItemListaUsuarioRegistrado;
