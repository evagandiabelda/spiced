"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AvatarOtros from "@/components/icons/AvatarOtros";
import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface ItemProps {
    id: string;
    nombre_real: string;
    name: string;
    foto: string;
    created_at: Date;
    num_colegiado: string;
    anyos_experiencia: number;
    lista_titulaciones: string[];
    onVerificar: (id: string) => void;
}

export default function ItemListaVerificacion({ id, nombre_real, name, foto, created_at, num_colegiado, anyos_experiencia, lista_titulaciones, onVerificar }: ItemProps) {

    const router = useRouter();
    const objetoFecha = new Date(created_at);
    const [mostrarTitulaciones, setMostrarTitulaciones] = useState<boolean>(false);

    const autor = {
        id: id,
        name: name,
        foto: foto,
        usuario_verificado: false, // Aquí ya sabemos que todavía no está verificado.
    }

    const perfilHref = `/perfil/${name}`;

    return (
        <li className="w-full flex flex-col gap-8 border-b border-b-1 border-[var(--gris1)] dark:border-[var(--gris4)]">

            <div className="w-full flex flex-col gap-6 p-4">

                <a href={perfilHref} className="w-full flex flex-row gap-4 p-4 rounded-xl hover:bg-[var(--gris1)] dark:hover:bg-[var(--gris4)]">

                    <div id="caja-avatar" className="relative w-[4rem] h-[4rem]">
                        <AvatarOtros
                            autor={autor}
                            disableOnClick
                        />
                    </div>

                    <div id="caja-textos" className="w-full flex-1 flex flex-col gap-8 py-2">

                        <div className="w-full flex mobile:flex-col laptop:flex-row justify-between mobile:gap-4 laptop:gap-12">
                            <div className="w-full flex flex-col gap-2">
                                <p className="font-bold">{nombre_real}</p>
                                <p className="font-bold text-[var(--gris2)]">@{name}</p>
                            </div>
                            <div className="w-full flex flex-row laptop:justify-end laptop:px-4">
                                <p><span className="text-[var(--gris3)]">Registrado: {objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</span></p>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <p className="text-[0.9rem]">Nº de Colegiado: {num_colegiado}</p>
                            <p className="text-[0.9rem]">{anyos_experiencia} años de experiencia.</p>
                        </div>

                    </div>

                </a>

                <div id="caja-botones" className="w-full flex flex-row justify-end gap-4">
                    <Boton texto={mostrarTitulaciones ? "Ocultar titulaciones" : "Ver titulaciones"} tamano="pequeno" jerarquia="secundario" onClick={() => mostrarTitulaciones ? setMostrarTitulaciones(false) : setMostrarTitulaciones(true)} />
                    <Boton texto="Verificar usuario" tamano="pequeno" jerarquia="primario" onClick={() => onVerificar(id)} />
                </div>

            </div>

            {mostrarTitulaciones &&
                <div className="w-full flex flex-col gap-2 px-12 pb-4">
                    {lista_titulaciones.map((titulacion, index) => (
                        <div key={index} className='w-full flex mobile:flex-col laptop:flex-row laptop:justify-between laptop:items-center gap-4 p-4 border-t border-t-1 border-[var(--gris1)] dark:border-[var(--gris4)]'>
                            <div className="w-full flex flex-row gap-2 items-center">
                                <div className='w-[3rem] flex flex-row items-center gap-4'>
                                    <Image
                                        src="/iconos/iconos-otros/icono-archivo-otros.svg"
                                        alt='icono archivo subido'
                                        width={34}
                                        height={34}
                                        className='object-contain'
                                    />
                                </div>
                                <div className='flex flex-1 pb-2'>
                                    <p>Titulación aportada #{index + 1}</p>
                                </div>
                            </div>
                            <div className="w-full flex flex-row justify-end">
                                <Boton texto="Ver archivo" enlace={titulacion} tamano="pequeno" jerarquia="secundario" nuevaPestana />
                            </div>
                        </div>
                    ))}
                </div>
            }

        </li>
    );
};
