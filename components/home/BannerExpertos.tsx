'use client';

import Image from "next/image";
import Boton from "@/components/buttons/Boton";

export default function BannerExpertos() {
    return (
        <div className="flex mobile:flex-col tablet:flex-row w-full">

            {/* CONTENEDOR IMAGEN */}
            <div className="flex flex flex-col justify-end mobile:w-full tablet:w-col5 mobile:h-[600px] tablet:h-full px-col1 py-[50px] bg-[url('/imgs/img-profesionales.webp')] bg-cover bg-center text-left">
                <h1 className="tablet:hidden text-white">¿Eres un profesional de la salud mental?</h1>
            </div>

            {/* CONTENEDOR TEXTOS */}
            <div className="flex flex-col gap-8 w-full tablet:h-full bg-[var(--brand2)] dark:bg-[var(--gris4)] p-col1 laptop:py-[5rem] text-left">
                <h1 className="mobile:hidden tablet:block dark:text-[var(--brand2)]">¿Eres un profesional de la salud mental?</h1>
                <p>Si trabajas en el campo de la psicología, la psiquiatría y la salud mental y cuentas con una titulación, ¡te queremos en el equipo!</p>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-start gap-4">
                        <Image
                            src="/iconos/iconos-otros/icono-tick-lista.svg"
                            alt="icono tick"
                            width="18"
                            height="18"
                            className="py-1 dark:invert dark:opacity-60"
                        />
                        <div>
                            <p><strong>Acceso a pacientes ilimitado y gratuito</strong></p>
                            <p>Date a conocer entre la comunidad neurodivergente más completa de España.</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-start gap-4">
                        <Image
                            src="/iconos/iconos-otros/icono-tick-lista.svg"
                            alt="icono tick"
                            width="18"
                            height="18"
                            className="py-1 dark:invert dark:opacity-60"
                        />
                        <div>
                            <p><strong>Verificación de contenido</strong></p>
                            <p>Podrás ayudarnos a mejorar la calidad de la información que se comparte, evitando bulos y contribuyendo a generar un espacio seguro y confiable.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mobile:items-center tablet:items-end gap-4 w-full">
                    <Boton
                        texto="Verifica tu cuenta gratis"
                        enlace="/register-expert"
                        tamano="grande"
                        jerarquia="primario"
                    />
                </div>
            </div>

        </div>
    );
}
