"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRegistro } from "@/components/RegistroContext";
import Input from "@/components/inputs/Input";
import Boton from '@/components/buttons/Boton';
import BotonSubmit from "@/components/buttons/BotonSubmit";

export default function Paso4() {

    const router = useRouter();
    const { setRegistroData } = useRegistro();

    // Datos que se piden en este paso:
    const [categorias, setCategorias] = useState<string[]>([]);

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setRegistroData({
            categorias,
        });

        router.push('/register/paso-3'); // ---------------> CAMBIAR POR LA PETICIÓN POST Y REDIRIGIR AL PANEL DE USUARIO.
    }

    const onHover = " border-2 border-[#605d5d]";
    const seleccionado = " opacity-40";

    return (
        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center gap-4">
            <div className='w-full text-center flex flex-col gap-6 px-col1'>
                <h2 className='w-full'>Vamos a construir tu feed</h2>
                <p>Elige qué tipo de contenido te gustaría ver. Puedes elegir más de una opción.<br /> ¿No lo tienes claro? ¡No te preocupes! Puedes cambiar esto más adelante.</p>
            </div>

            <div className="w-full flex flex-col items-center gap-4 pb-4 pt-8 transition-all">

                {/* Bloque Superior */}

                <div className="w-full flex mobile:flex-col laptop:flex-row items-center gap-4">

                    {/* Bloque Izquierdo */}

                    <div className="mobile:w-full laptop:w-2/3 flex flex-col items-center gap-4">

                        {/* Bloque Superior */}

                        <div className="w-full flex flex-row items-center gap-4">

                            {/* Bloque Izquierdo */}

                            <div className="w-full min-h-[180px] flex justify-end items-center gap-4 p-8 rounded-xl bg-[var(--tea)] bg-[url('/imgs/categorias/img-arte.png')] bg-no-repeat bg-auto bg-right">
                                <h4 className='text-white text-[1.6rem]'>Arte</h4>
                            </div>

                            {/* Bloque Derecho */}

                            <div className="w-full min-h-[180px] flex gap-4 p-8 rounded-xl bg-[var(--tlp)] bg-[url('/imgs/categorias/img-bienestar.png')] bg-no-repeat bg-auto bg-bottom bg-bottom bg-left-top">
                                <h4 className='text-white text-[1.6rem]'>Bienestar</h4>
                            </div>

                        </div>

                        {/* Bloque Inferior */}

                        <div className="w-full min-h-[180px] flex justify-end items-center gap-4 p-12 rounded-xl bg-[var(--tag)] bg-[url('/imgs/categorias/img-documentales.png')] bg-no-repeat bg-auto bg-left">
                            <h4 className='text-white text-[1.6rem]'>Documentales</h4>
                        </div>

                    </div>

                    {/* Bloque Derecho */}

                    <div className="mobile:w-full laptop:w-1/3 h-full min-h-[180px] flex justify-center gap-4 p-12 rounded-xl bg-[var(--tb)] bg-[url('/imgs/categorias/img-recetas.png')] bg-no-repeat bg-auto bg-center mobile:bg-top laptop:bg-bottom">
                        <h4 className='text-white text-[1.6rem]'>Recetas</h4>
                    </div>

                </div>

                {/* Bloque Inferior */}

                <div className="w-full flex mobile:flex-col laptop:flex-row items-center gap-4">

                    {/* Bloque Izquierdo */}

                    <div className="mobile:w-full laptop:w-1/3 h-full flex mobile:flex-row laptop:flex-col items-center gap-4">

                        {/* Bloque Superior */}

                        <div className="w-full min-h-[180px] flex gap-4 p-12 rounded-xl bg-[var(--tep)] bg-[url('/imgs/categorias/img-cine.png')] bg-no-repeat bg-auto bg-left">
                            <h4 className='text-white text-[1.6rem]'>Cine</h4>
                        </div>

                        {/* Bloque Inferior */}

                        <div className="w-full h-full flex justify-center gap-4 p-12 rounded-xl bg-[var(--ta)] bg-[url('/imgs/categorias/img-educacion.png')] bg-no-repeat bg-auto bg-bottom bg-right-bottom">
                            <h4 className='text-white text-[1.6rem]'>Educación</h4>
                        </div>

                    </div>

                    {/* Bloque Derecho */}

                    <div className="mobile:w-full laptop:w-2/3 h-full flex flex-col items-center gap-4">

                        {/* Bloque Superior */}

                        <div className="w-full h-full flex flex-row items-center gap-4">

                            {/* Bloque Izquierdo */}

                            <div className="w-full h-full flex justify-center gap-4 p-12 rounded-xl bg-[var(--fob)] bg-[url('/imgs/categorias/img-gaming.png')] bg-no-repeat bg-auto bg-right-top">
                                <h4 className='text-white text-[1.6rem]'>Gaming</h4>
                            </div>

                            {/* Bloque Derecho */}

                            <div className="w-full flex flex-col items-center gap-4">

                                {/* Bloque Superior */}

                                <div className="w-full min-h-[180px] flex justify-end gap-4 p-8 rounded-xl bg-[var(--td)] bg-[url('/imgs/categorias/img-lectura.png')] bg-no-repeat bg-auto bg-right-top">
                                    <h4 className='text-white text-[1.6rem]'>Lectura</h4>
                                </div>

                                {/* Bloque Inferior */}

                                <div className="w-full min-h-[180px] flex items-center gap-4 p-8 rounded-xl bg-[var(--tdah)] bg-[url('/imgs/categorias/img-hogar.png')] bg-no-repeat bg-auto bg-bottom bg-left">
                                    <h4 className='text-white text-[1.6rem]'>Hogar</h4>
                                </div>

                            </div>

                        </div>

                        {/* Bloque Inferior */}

                        <div className="w-full min-h-[180px] flex justify-end items-center gap-4 p-12 rounded-xl bg-[var(--tpa)] bg-[url('/imgs/categorias/img-compartir.png')] bg-no-repeat bg-auto bg-center bg-left">
                            <h4 className='text-white text-[1.6rem]'>Compartir</h4>
                        </div>

                    </div>

                </div>

            </div>

            {/* BOTONES */}

            <div className="w-full flex flex-row justify-end items-center gap-4 py-10">
                <Boton
                    texto='Atrás'
                    enlace='/register/paso-3'
                    tamano='grande'
                    jerarquia='secundario'
                />
                <BotonSubmit
                    texto="Siguiente"
                    icon="/iconos/iconos-otros/icono-arrow-right.svg"
                />
            </div>

        </form>
    );
}