"use client";

import { useState, useEffect } from "react";

interface BentoCategoriasProps {
    onSeleccionChange?: (seleccionadas: string[]) => void;
}

export default function BentoCategorias({ onSeleccionChange }: BentoCategoriasProps) {

    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([]);

    const toggleCategoria = (categoria: string) => {
        setCategoriasSeleccionadas((prev) =>
            prev.includes(categoria)
                ? prev.filter((c) => c !== categoria)
                : [...prev, categoria]
        );
    };

    useEffect(() => {
        if (onSeleccionChange) {
            onSeleccionChange(categoriasSeleccionadas);
        }
    }, [categoriasSeleccionadas]);

    // ESTILOS:
    const estiloBase = "flex rounded-xl bg-no-repeat bg-auto hover:scale-[1.01] transition ease cursor-pointer ";
    const estiloSeleccionado = " border-2 border-[#605d5d] opacity-40 ";
    const estilos = {
        arte: "w-full min-h-[180px] justify-end items-center p-8 bg-[var(--tea)] bg-[url('/imgs/categorias/img-arte.png')] bg-right",
        bienestar: "w-full min-h-[180px] p-8 bg-[var(--tlp)] bg-[url('/imgs/categorias/img-bienestar.png')] bg-bottom bg-bottom bg-left-top",
        documentales: "w-full min-h-[180px] justify-end items-center p-12 bg-[var(--tag)] bg-[url('/imgs/categorias/img-documentales.png')] bg-left",
        recetas: "mobile:w-full laptop:w-1/3 h-full min-h-[180px] justify-center p-12 bg-[var(--tb)] bg-[url('/imgs/categorias/img-recetas.png')] bg-center mobile:bg-top laptop:bg-bottom",
        cine: "w-full min-h-[180px] p-12 bg-[var(--tep)] bg-[url('/imgs/categorias/img-cine.png')] bg-left",
        educacion: "w-full h-full justify-center p-12 bg-[var(--ta)] bg-[url('/imgs/categorias/img-educacion.png')] bg-bottom bg-right-bottom",
        gaming: "w-full h-full justify-center p-12 bg-[var(--fob)] bg-[url('/imgs/categorias/img-gaming.png')] bg-right-top",
        lectura: "w-full min-h-[180px] justify-end p-8 bg-[var(--td)] bg-[url('/imgs/categorias/img-lectura.png')] bg-right-top",
        hogar: "w-full min-h-[180px] items-center p-8 bg-[var(--tdah)] bg-[url('/imgs/categorias/img-hogar.png')] bg-bottom bg-left",
        compartir: "w-full min-h-[180px] justify-end items-center p-12 bg-[var(--tpa)] bg-[url('/imgs/categorias/img-compartir.png')] bg-center bg-left",
    }

    return (

        <div className="w-full flex flex-col items-center gap-4 pb-4 pt-8 transition-all">

            {/* Bloque Superior */}

            <div className="w-full flex mobile:flex-col laptop:flex-row items-center gap-4">

                {/* Bloque Izquierdo */}

                <div className="mobile:w-full laptop:w-2/3 flex flex-col items-center gap-4">

                    {/* Bloque Superior */}

                    <div className="w-full flex flex-row items-center gap-4">

                        {/* Bloque Izquierdo */}

                        <div
                            onClick={() => toggleCategoria("arte")}
                            className={estiloBase
                                .concat(estilos.arte)
                                .concat(categoriasSeleccionadas.includes("arte") ? estiloSeleccionado : "")
                            }>
                            <h4 className='text-white text-[1.6rem]'>Arte</h4>
                        </div>

                        {/* Bloque Derecho */}

                        <div
                            onClick={() => toggleCategoria("bienestar")}
                            className={estiloBase
                                .concat(estilos.bienestar)
                                .concat(categoriasSeleccionadas.includes("bienestar") ? estiloSeleccionado : "")
                            }>
                            <h4 className='text-white text-[1.6rem]'>Bienestar</h4>
                        </div>

                    </div>

                    {/* Bloque Inferior */}

                    <div
                        onClick={() => toggleCategoria("documentales")}
                        className={estiloBase
                            .concat(estilos.documentales)
                            .concat(categoriasSeleccionadas.includes("documentales") ? estiloSeleccionado : "")
                        }>
                        <h4 className='text-white text-[1.6rem]'>Documentales</h4>
                    </div>

                </div>

                {/* Bloque Derecho */}

                <div
                    onClick={() => toggleCategoria("recetas")}
                    className={estiloBase
                        .concat(estilos.recetas)
                        .concat(categoriasSeleccionadas.includes("recetas") ? estiloSeleccionado : "")
                    }>
                    <h4 className='text-white text-[1.6rem]'>Recetas</h4>
                </div>

            </div>

            {/* Bloque Inferior */}

            <div className="w-full flex mobile:flex-col laptop:flex-row items-center gap-4">

                {/* Bloque Izquierdo */}

                <div className="mobile:w-full laptop:w-1/3 h-full flex mobile:flex-row laptop:flex-col items-center gap-4">

                    {/* Bloque Superior */}

                    <div
                        onClick={() => toggleCategoria("cine")}
                        className={estiloBase
                            .concat(estilos.cine)
                            .concat(categoriasSeleccionadas.includes("cine") ? estiloSeleccionado : "")
                        }>
                        <h4 className='text-white text-[1.6rem]'>Cine</h4>
                    </div>

                    {/* Bloque Inferior */}

                    <div
                        onClick={() => toggleCategoria("educacion")}
                        className={estiloBase
                            .concat(estilos.educacion)
                            .concat(categoriasSeleccionadas.includes("educacion") ? estiloSeleccionado : "")
                        }>
                        <h4 className='text-white text-[1.6rem]'>Educación</h4>
                    </div>

                </div>

                {/* Bloque Derecho */}

                <div className="mobile:w-full laptop:w-2/3 h-full flex flex-col items-center gap-4">

                    {/* Bloque Superior */}

                    <div className="w-full h-full flex flex-row items-center gap-4">

                        {/* Bloque Izquierdo */}

                        <div
                            onClick={() => toggleCategoria("gaming")}
                            className={estiloBase
                                .concat(estilos.gaming)
                                .concat(categoriasSeleccionadas.includes("gaming") ? estiloSeleccionado : "")
                            }>
                            <h4 className='text-white text-[1.6rem]'>Gaming</h4>
                        </div>

                        {/* Bloque Derecho */}

                        <div className="w-full flex flex-col items-center gap-4">

                            {/* Bloque Superior */}

                            <div
                                onClick={() => toggleCategoria("lectura")}
                                className={estiloBase
                                    .concat(estilos.lectura)
                                    .concat(categoriasSeleccionadas.includes("lectura") ? estiloSeleccionado : "")
                                }>
                                <h4 className='text-white text-[1.6rem]'>Lectura</h4>
                            </div>

                            {/* Bloque Inferior */}

                            <div
                                onClick={() => toggleCategoria("hogar")}
                                className={estiloBase
                                    .concat(estilos.hogar)
                                    .concat(categoriasSeleccionadas.includes("hogar") ? estiloSeleccionado : "")
                                }>
                                <h4 className='text-white text-[1.6rem]'>Hogar</h4>
                            </div>

                        </div>

                    </div>

                    {/* Bloque Inferior */}

                    <div
                        onClick={() => toggleCategoria("compartir")}
                        className={estiloBase
                            .concat(estilos.compartir)
                            .concat(categoriasSeleccionadas.includes("compartir") ? estiloSeleccionado : "")
                        }>
                        <h4 className='text-white text-[1.6rem]'>Compartir</h4>
                    </div>

                </div>

            </div>

        </div>

    );
}