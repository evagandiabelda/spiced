import { Metadata } from "next";
import Image from "next/image";
import SapsForm from "@/components/inputs/forms/saps-form";

export const metadata: Metadata = {
    title: 'Chat',
};

export default async function Chat() {

    return (
        <div className="w-full flex flex-col items-center mobile:gap-12 tablet:gap-0 px-col1 pt-[3rem] pb-32">

            {/* 'Volver al listado de solicitudes de chat' */}

            <div className="w-full flex flex-row items-center gap-4">
                <Image
                    src="/iconos/iconos-otros/icono-flecha-desplegar.svg"
                    alt="Volver al Feed"
                    width={12}
                    height={12}
                    className="rotate-90"
                />
                <a href="/panel-experto/saps" className="text-[var(--gris3)]">Atrás</a>
            </div>

            {/* CONTENIDO */}

            <div className='w-full flex flex-col items-center gap-12 py-16 border-b border-b-1 border-b-[#b0aaaa]'>
                <SapsForm />
            </div>

        </div>
    );

}