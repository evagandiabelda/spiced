import { Metadata } from "next";
import Image from "next/image";
import SugerenciasForm from "@/components/inputs/forms/sugerencias-form";

export const metadata: Metadata = {
    title: 'Sugerencias',
};

export default async function Sugerencias() {

    return (
        <div className="w-full flex flex-col items-center mobile:gap-12 tablet:gap-0 px-col1 pt-[3rem] pb-32">

            {/* 'Volver' */}

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

            {/* CABECERA */}

            <div className="w-full flex mobile:flex-col tablet:flex-row tablet:justify-between items-center gap-8 tablet:px-col1 border-b border-b-1 border-b-[#b0aaaa]">

                <div className="w-full flex flex-col mobile:items-center tablet:items-start mobile:text-center tablet:text-left tablet:flex-1 gap-6">
                    <div className="flex flex-row gap-4 items-center">
                        <h4>Escuchamos tus sugerencias</h4>
                    </div>
                    <h1>Ayúdanos a mejorar</h1>
                </div>

                <div className="mobile:w-full tablet-w-col3 laptop:w-col2 h-auto flex flex-col items-center">
                    <Image
                        src="/imgs/img-sugerencias.svg"
                        alt="imagen de apoyo"
                        width={300}
                        height={300}
                        className="object-contain"
                    />

                </div>

            </div>

            {/* CONTENIDO */}

            <div className='w-full flex flex-col items-center gap-12 mobile:px-col1 tablet:px-col1 pt-20'>

                <p>Este es tu espacio para compartir ideas, sugerencias y propuestas que nos ayuden a hacer de Spiced un lugar aún mejor para toda su comunidad. ¡Queremos escuchar tus recomendaciones!</p>

                <SugerenciasForm />

            </div>

        </div>
    );

}