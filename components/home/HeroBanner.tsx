'use client';

import { useSession } from "next-auth/react";

export default function HeroBanner() {

    const { data: session } = useSession();

    return (
        <div className="w-full flex mobile:bg-[url('/imgs/IMG-Banner-Inicio-Mobile-2.webp')] tablet:bg-[url('/imgs/IMG-Banner-Inicio-Desktop-2.webp')] bg-cover bg-top mobile:px-col1 laptop:px-col2 py-[100px]">

            <div className="flex flex-col justify-center gap-8 h-full max-w-3xl mobile:pt-[340px] tablet:pt-[0px] mobile:text-center tablet:text-left">
                <h1 className="tablet:text-5xl tablet:w-col3 text-white">We are neurospicy.</h1>
                <div className="flex flex-col gap-4 tablet:w-col4">
                    <p className="text-white">Si el universo neuro-normativo te aburre, este espacio es para ti.</p>
                    <p className="text-white">Una comunidad neurodivergente en la que poder compartir contenido, aprender sobre tu condición y divertirte a tu manera.</p>
                </div>
                <div className="flex flex-col mobile:items-center laptop:items-start gap-4 mobile:w-full laptop:w-3/5">

                    {/* NO se usa el componente "Boton.tsx" para los siguientes botones, ya que se requiere personalización avanzada: */}

                    <a href="/register" className="w-full flex justify-center gap-4 text-center font-semibold rounded-full border-2 hover:scale-[1.02] transition ease duration-300 cursor-pointer a-boton-gr px-[1.8rem] py-[0.4rem] text-[var(--blanco)] border-[var(--gris5)] bg-[var(--gris5)]">
                        <div className="flex flex-row justify-center gap-4">
                            {session ? "Ir a mi Panel" : "Empecemos desde cero"}
                        </div>
                    </a>
                    <a href="/explorar" className="w-full flex justify-center gap-4 text-center font-semibold rounded-full border-2 hover:scale-[1.02] transition ease duration-300 cursor-pointer a-boton-gr px-[1.8rem] py-[0.4rem] hover:bg-black/10 text-[var(--gris5)] border-[var(--gris5)]">
                        <div className="flex flex-row justify-center gap-4">
                            Explorar por mi cuenta
                        </div>
                    </a>
                </div>
            </div>

        </div>
    );
}
