"use client";

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import RegistroTimeline from '@/components/layout/RegistroTimeline';
import Boton from "@/components/buttons/Boton";

interface RegistroSidebarProps {
    usuario: "standard" | "expert";
}

export default function RegistroSidebar({ usuario }: RegistroSidebarProps) {

    // Obtener el número de paso actual a partir de la URL de la página actual:
    const pathname = usePathname();
    const [pasoActual, setPasoActual] = useState<number>(0);

    useEffect(() => {
        const pasoMatch = pathname.match(/paso-(\d+)/);
        const numeroPaso = pasoMatch ? parseInt(pasoMatch[1]) : 0;
        setPasoActual(numeroPaso);
    }, [pathname]); // <-- se ejecuta cada vez que cambie la URL

    let className = "bg-cover bg-center flex flex-col items-center mobile:gap-12 tablet:gap-16 w-full h-full p-16 ";

    if (usuario === "standard") {
        className += "bg-[url('/imgs/IMG-Fondo-Aside-Signin.webp')]";
    }
    else if (usuario === "expert") {
        className += "bg-[url('/imgs/IMG-Fondo-Aside-Expertos.webp')]";
    }

    return (
        <div className={className}>
            <div className="flex flex-col gap-6">
                <h3 className="text-white underline">Creando tu cuenta</h3>
                <h1 className="text-white mobile:hidden tablet:block">Vamos a conocernos mejor</h1>
                {pasoActual === 0 &&
                    <p className='text-white'>Estamos deseando que seas parte de la comunidad de Spiced. Vamos a empezar por lo básico.</p>
                }
            </div>
            <div className="flex flex-col items-center gap-6 w-full">
                {pasoActual !== 0 &&
                    <RegistroTimeline
                        usuario={usuario}
                        pasoActual={pasoActual}
                    />
                }
                {pasoActual === 0 &&
                    <div className="flex flex-col items-center gap-6 w-full">
                        <p className="tag text-white font-normal text-center">¿Ya eres miembro de Spiced?</p>
                        <Boton texto="Entra" enlace="/login" tamano="grande" jerarquia="secundario" customColor="white" />
                    </div>
                }
            </div>
        </div>
    );

}