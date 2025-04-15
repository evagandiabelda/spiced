"use client";

import Image from "next/image";

interface RegistroTimelineProps {
    usuario: "standard" | "expert";
    pasoActual: number;
}

export default function RegistroTimeline({ usuario, pasoActual }: RegistroTimelineProps) {

    const srcPasoActivo = "/iconos/iconos-registro/icono-paso-activo-neg.svg";
    const srcPasoHecho = "/iconos/iconos-registro/icono-paso-hecho-neg.svg";

    const estiloTexto = "text-white opacity-60 text-[1rem]";
    const estiloTextoActivo = "text-white font-bold opacity-100 text-[1.2rem]";

    /* ------------- SIDEBAR PARA REGISTRO DE USUARIO ESTÁNDAR: ------------- */

    if (usuario === "standard") {

        return (

            <div className="w-full flex flex-row">

                {/* Mobile: */}
                <div className="w-full mobile:flex tablet:hidden flex-row justify-center gap-8">
                    <Image
                        src={pasoActual > 1 ? srcPasoHecho : srcPasoActivo}
                        alt="paso 1"
                        width={14}
                        height={14}
                        className={pasoActual === 1 ? "opacity-100 scale-[1.2]" : "opacity-50 scale-[1]"}
                    />
                    <Image
                        src={pasoActual > 2 ? srcPasoHecho : srcPasoActivo}
                        alt="paso 2"
                        width={14}
                        height={14}
                        className={pasoActual === 2 ? "opacity-100 scale-[1.2]" : "opacity-50 scale-[1]"}
                    />
                    <Image
                        src={pasoActual > 3 ? srcPasoHecho : srcPasoActivo}
                        alt="paso 3"
                        width={14}
                        height={14}
                        className={pasoActual === 3 ? "opacity-100 scale-[1.2]" : "opacity-50 scale-[1]"}
                    />
                    <Image
                        src={pasoActual > 4 ? srcPasoHecho : srcPasoActivo}
                        alt="paso 4"
                        width={14}
                        height={14}
                        className={pasoActual === 4 ? "opacity-100 scale-[1.2]" : "opacity-50 scale-[1]"}
                    />
                </div>

                {/* Tablet/Desktop */}
                <div className="w-full mobile:hidden tablet:flex flex-row gap-4">
                    <div className="flex flex-col items-center gap-12 border-l border-l-white border-l-2 border-dashed">
                        <Image
                            src={pasoActual > 1 ? srcPasoHecho : srcPasoActivo}
                            alt="paso 1"
                            width={24}
                            height={24}
                            className="translate-x-[-12px]"
                        />
                        <Image
                            src={pasoActual > 2 ? srcPasoHecho : srcPasoActivo}
                            alt="paso 2"
                            width={24}
                            height={24}
                            className="translate-x-[-12px]"
                        />
                        <Image
                            src={pasoActual > 3 ? srcPasoHecho : srcPasoActivo}
                            alt="paso 3"
                            width={24}
                            height={24}
                            className="translate-x-[-12px]"
                        />
                        <Image
                            src={pasoActual > 4 ? srcPasoHecho : srcPasoActivo}
                            alt="paso 4"
                            width={24}
                            height={24}
                            className="translate-x-[-12px]"
                        />
                    </div>
                    <div className="w-full flex flex-col justify-between">
                        <p className={pasoActual === 1 ? estiloTextoActivo : estiloTexto}>Información básica</p>
                        <p className={pasoActual === 2 ? estiloTextoActivo : estiloTexto}>Tu perfil</p>
                        <p className={pasoActual === 3 ? estiloTextoActivo : estiloTexto}>Define tus Spices</p>
                        <p className={pasoActual === 4 ? estiloTextoActivo : estiloTexto}>Construye tu feed</p>
                    </div>
                </div>

            </div>

        );

    }

    /* ------------- SIDEBAR PARA REGISTRO DE USUARIO EXPERTO: ------------- */

    if (usuario === "expert") {

        return (

            <div className="w-full flex flex-row">

                {/* Mobile: */}
                <div className="w-full mobile:flex tablet:hidden flex-row justify-center gap-8">
                    <Image
                        src={pasoActual > 1 ? srcPasoHecho : srcPasoActivo}
                        alt="paso 1"
                        width={14}
                        height={14}
                        className={pasoActual === 1 ? "opacity-100 scale-[1.2]" : "opacity-50 scale-[1]"}
                    />
                    <Image
                        src={pasoActual > 2 ? srcPasoHecho : srcPasoActivo}
                        alt="paso 2"
                        width={14}
                        height={14}
                        className={pasoActual === 2 ? "opacity-100 scale-[1.2]" : "opacity-50 scale-[1]"}
                    />
                    <Image
                        src={pasoActual > 3 ? srcPasoHecho : srcPasoActivo}
                        alt="paso 3"
                        width={14}
                        height={14}
                        className={pasoActual === 3 ? "opacity-100 scale-[1.2]" : "opacity-50 scale-[1]"}
                    />
                    <Image
                        src={pasoActual > 4 ? srcPasoHecho : srcPasoActivo}
                        alt="paso 4"
                        width={14}
                        height={14}
                        className={pasoActual === 4 ? "opacity-100 scale-[1.2]" : "opacity-50 scale-[1]"}
                    />
                </div>

                {/* Tablet/Desktop */}
                <div className="w-full mobile:hidden tablet:flex flex-row gap-4">
                    <div className="flex flex-col items-center gap-12 border-l border-l-white border-l-2 border-dashed">
                        <Image
                            src={pasoActual > 1 ? srcPasoHecho : srcPasoActivo}
                            alt="paso 1"
                            width={24}
                            height={24}
                            className="translate-x-[-12px]"
                        />
                        <Image
                            src={pasoActual > 2 ? srcPasoHecho : srcPasoActivo}
                            alt="paso 2"
                            width={24}
                            height={24}
                            className="translate-x-[-12px]"
                        />
                        <Image
                            src={pasoActual > 3 ? srcPasoHecho : srcPasoActivo}
                            alt="paso 3"
                            width={24}
                            height={24}
                            className="translate-x-[-12px]"
                        />
                        <Image
                            src={pasoActual > 4 ? srcPasoHecho : srcPasoActivo}
                            alt="paso 4"
                            width={24}
                            height={24}
                            className="translate-x-[-12px]"
                        />
                    </div>
                    <div className="w-full flex flex-col justify-between">
                        <p className={pasoActual === 1 ? estiloTextoActivo : estiloTexto}>Información básica</p>
                        <p className={pasoActual === 2 ? estiloTextoActivo : estiloTexto}>Documentación</p>
                        <p className={pasoActual === 3 ? estiloTextoActivo : estiloTexto}>Pacientes</p>
                        <p className={pasoActual === 4 ? estiloTextoActivo : estiloTexto}>Construye tu feed</p>
                    </div>
                </div>

            </div>

        );

    }

}