"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import SapsExpertForm from "@/components/inputs/forms/saps-expert-form";

export default function Chat() {

    const params = useParams();
    const { id } = params as { id: string };

    return (
        <div className="w-full flex flex-col items-center pb-32">

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
                <SapsExpertForm channelId={id} />
            </div>

        </div>
    );

}