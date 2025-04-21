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

const ItemListaVerificacion = ({ id, nombre_real, name, foto, created_at, num_colegiado, anyos_experiencia, lista_titulaciones, onVerificar }: ItemProps) => {

    const router = useRouter();
    const objetoFecha = new Date(created_at);
    const [mostrarTitulaciones, setMostrarTitulaciones] = useState<boolean>(false);

    const autor = {
        id: id,
        name: name,
        foto: foto,
        usuario_verificado: false, // Aquí ya sabemos que todavía no está verificado.
    }

    return (
        <li className="w-full flex flex-col gap-8 px-4 pt-4 pb-8 border-b border-b-1 border-[var(--gris1)]">

            <div className="w-full flex-col mobile:gap-8 laptop:gap-16 p-4">

                <div className="w-full flex flex-row gap-4">

                    <div id="caja-avatar" className="relative w-[4rem] h-[4rem]">
                        <AvatarOtros
                            autor={autor}
                        />
                    </div>

                    <div id="caja-textos" className="w-full flex-1 flex flex-col gap-8 py-2">

                        <div className="w-full flex flex-row justify-between gap-12">
                            <div className="w-full flex flex-col gap-2">
                                <p className="font-bold">{nombre_real}</p>
                                <p className="font-bold text-[var(--gris2)]">@{name}</p>
                            </div>
                            <div className="w-full flex flex-row justify-end px-4">
                                <p><span className="text-[var(--gris3)]">Registrado: {objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</span></p>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <p className="text-[0.9rem]">Nº de Colegiado: {num_colegiado}</p>
                            <p className="text-[0.9rem]">{anyos_experiencia} años de experiencia.</p>
                        </div>

                    </div>

                </div>

                <div id="caja-botones" className="w-full flex flex-row justify-end gap-4">
                    <Boton texto={mostrarTitulaciones ? "Ocultar titulaciones" : "Ver titulaciones"} tamano="pequeno" jerarquia="secundario" onClick={() => mostrarTitulaciones ? setMostrarTitulaciones(false) : setMostrarTitulaciones(true)} />
                    <Boton texto="Verificar usuario" tamano="pequeno" jerarquia="primario" onClick={() => onVerificar(id)} />
                </div>

            </div>

            {mostrarTitulaciones &&
                <div className="w-full flex flex-col gap-2 px-12">
                    {lista_titulaciones.map((titulacion, index) => (
                        <div key={index} className='w-full flex flex-row justify-between items-center gap-2 p-4 border-b border-b-1 border-[var(--gris1)]'>
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
                            <div>
                                <Boton texto="Ver archivo" enlace={titulacion} tamano="pequeno" jerarquia="secundario" />
                            </div>
                        </div>
                    ))}
                </div>
            }

        </li>
    );
};

export default ItemListaVerificacion;
