'use client';

import Boton from "@/components/buttons/Boton";

export default function HeroBanner() {
    return (
        <div className="flex mobile:flex-col tablet:flex-row w-full mobile:bg-[url('/imgs/IMG-Banner-Inicio-Mobile-2.webp')] tablet:bg-[url('/imgs/IMG-Banner-Inicio-Desktop-2.webp')] bg-cover tablet:bg-center mobile:px-col1 laptop:px-col2 py-[100px]">

            <div className="flex flex-col justify-center gap-8 h-full max-w-3xl mobile:pt-[340px] tablet:pt-[0px] mobile:text-center tablet:text-left">
                <h1 className="tablet:text-5xl tablet:w-col3 text-white">We are neurospicy.</h1>
                <div className="flex flex-col gap-4 tablet:w-col4">
                    <p className="text-white">Si el universo neuro-normativo te aburre, este espacio es para ti.</p>
                    <p className="text-white">Una comunidad neurodivergente en la que poder compartir contenido, aprender sobre tu condición y divertirte a tu manera.</p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <Boton
                        texto="Empecemos desde cero"
                        enlace="/register"
                        tamano="grande"
                        jerarquia="primario"
                    />
                    <Boton
                        texto="Explorar por mi cuenta"
                        enlace="/feed"
                        tamano="grande"
                        jerarquia="secundario"
                    />
                </div>
            </div>

        </div>
    );
}
