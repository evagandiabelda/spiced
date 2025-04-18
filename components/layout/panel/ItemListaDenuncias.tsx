"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AvatarOtros from "@/components/icons/AvatarOtros";
import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface ItemProps {
    motivo: string;
    fecha: Date;
    share: {
        id: string;
        titulo: string;
        img_principal: string;
        slug: string;
        autor: {
            id: string;
            name: string;
        }
    }
    user: {
        id: string;
        name: string;
        foto: string;
        usuario_verificado: boolean;
    }
}

const ItemListaDenuncias = ({ motivo, fecha, share, user }: ItemProps) => {

    const router = useRouter();
    const objetoFecha = new Date(fecha);

    return (
        <li className="w-full flex flex-col justify-between items-center gap-4 rounded-xl p-4 hover:bg-[var(--gris1)] cursor-pointer" onClick={() => router.push(`/shares/${share.slug}`)}>

            <div className="flex-1 flex flex-col mobile:items-start tablet:items-center gap-8">

                <div id="caja-share" className="w-full flex flex-row gap-4">
                    <div className="relative w-[4rem] h-[4rem]">
                        <Image
                            src={share.img_principal}
                            alt='miniatura del share'
                            fill
                            className="rounded-xl object-cover"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <p className="font-bold">{share.titulo}</p>
                        <p className="text-[0.8rem] text-[var(--gris3)]">Autor: @{share.autor.name}</p>
                    </div>
                </div>


                <div id="caja-denuncia" className="w-full flex-1 flex flex-col justify-between gap-4">
                    <div className="w-full pb-2 border-b border-b-2 border-[#b0aaa]">
                        <p className='text-[0.7rem] text-[var(--gris2)]'>Denunciante:</p>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center gap-8">
                        <div className="w-full">
                            <p><span className="text-[var(--gris2)] opacity-60">{objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</span></p>
                        </div>
                        <div className="w-full flex flex-row justify-end items-center gap-2">
                            <p>{user.name}</p>
                            <div className="w-[3rem]">
                                <AvatarOtros autor={user} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <p><span>{motivo}</span></p>
                    </div>
                </div>

            </div>

        </li>
    );
};

export default ItemListaDenuncias;
