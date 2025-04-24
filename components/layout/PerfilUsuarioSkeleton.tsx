"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";
import ShareSkeleton from "@/components/cards/ShareSkeleton";

export default function PerfilUsuarioSkeleton() {

    return (
        <div className="w-full flex flex-col items-center gap-12 px-col1 pt-[3rem] pb-32">

            {/* Cabecera 'Volver' */}

            <div className="w-full flex flex-row items-center gap-4">
                <Image
                    src="/iconos/iconos-otros/icono-flecha-desplegar.svg"
                    alt="Volver al Feed"
                    width={12}
                    height={12}
                    className="rotate-90"
                />
                <a href="/explorar" className="text-[var(--gris3)]">Volver</a>
            </div>

            {/* Datos Usuario */}

            <div className="w-full flex mobile:flex-col tablet:flex-row mobile:gap-0 tablet:gap-8 px-col1 pb-12 border-b border-b-1 border-b-[#b0aaaa]">

                <div className="w-col1">
                    <div className="w-[110px] h-[110px] rounded-full bg-[var(--gris2)] opacity-30"></div>
                </div>

                <div className='w-full flex flex-col pt-7 mobile:gap-8 tablet:gap-10'>

                    <div className='w-full flex mobile:flex-col laptop:flex-row justify-between items-start gap-8'>
                        <div className='flex flex-col flex-1 gap-4'>
                            <div className="w-1/2 h-8 rounded-xl bg-[var(--gris2)] opacity-30"></div>
                            <div className="w-1/3 h-5 rounded-xl bg-[var(--gris2)] opacity-30"></div>
                        </div>
                        <div className="w-1/3 h-5 rounded-xl bg-[var(--gris2)] opacity-30"></div>
                    </div>

                    <div className='mobile:w-full laptop:w-1/2 flex flex-col gap-2'>
                        <div className="w-full h-4 rounded-xl bg-[var(--gris2)] opacity-30"></div>
                        <div className="w-2/3 h-4 rounded-xl bg-[var(--gris2)] opacity-30"></div>
                    </div>

                    <div className='w-full flex mobile:flex-col laptop:flex-row justify-between items-end gap-8'>

                        <div className='w-1/2 flex flex-wrap gap-2'>
                            <div className="w-[50px] h-6 rounded-full bg-[var(--gris2)] opacity-30"></div>
                            <div className="w-[50px] h-6 rounded-full bg-[var(--gris2)] opacity-30"></div>
                            <div className="w-[50px] h-6 rounded-full bg-[var(--gris2)] opacity-30"></div>
                        </div>

                        <div className='w-full flex flex-wrap justify-end items-center gap-4'>
                            <div className="w-[130px] h-10 rounded-full bg-[var(--gris2)] opacity-30"></div>
                            <div className="w-[130px] h-10 rounded-full bg-[var(--gris2)] opacity-30"></div>
                        </div>

                    </div>

                </div>

            </div>

            {/* Shares del Usuario */}

            <div className='w-full h-[600px] flex flex-col items-center gap-10'>

                <div className="w-1/3 h-8 rounded-xl bg-[var(--gris2)] opacity-30"></div>

                <div className='w-full flex flex-col items-center'>
                    <Masonry
                        breakpointCols={{
                            default: 5, // Ordenadores grandes
                            1600: 4, // Ordenadores pequeños
                            1024: 3, // Tablets
                            768: 2, // Móviles grandes
                            500: 1, // Móviles pequeños
                        }}
                        className="w-full flex gap-5"
                        columnClassName="masonry-column"
                    >
                        <ShareSkeleton />
                        <ShareSkeleton />
                        <ShareSkeleton />
                        <ShareSkeleton />
                    </Masonry>
                </div>
            </div>

        </div>
    );

}