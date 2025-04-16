"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRegistro } from "@/context/RegistroContext";
import NubeTagsDinamica from '@/components/buttons/NubeTagsDinamica';
import Boton from '@/components/buttons/Boton';
import BotonSubmit from "@/components/buttons/BotonSubmit";

export default function Paso3() {

    const router = useRouter();
    const { setRegistroData } = useRegistro();

    // Datos que se piden en este paso:
    const [spices, setSpices] = useState<string[]>([]);

    // Gestión de selección de Spices:
    const manejarSeleccionDeTags = (tags: string[]) => {
        setSpices(tags);
    };

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setRegistroData({
            spices,
        });

        router.push('/register-expert/paso-4');
    }

    return (
        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center gap-4">
            <div className='w-full text-center flex flex-col gap-6 px-col1'>
                <h2 className='w-full'>Elige tus especialidades</h2>
                <p>Tu perfil aparecerá recomendado principalmente a los usuarios que se identifiquen con tus especialidades.</p>
                <p>Por favor, elige únicamente aquellas que mejor encajan con tu perfil profesional.</p>
            </div>

            <div className="w-full flex flex-col justify-center items-center gap-8 pb-4 pt-8">
                <NubeTagsDinamica
                    uso='register'
                    defaultActive={true}
                    onSeleccionarTags={manejarSeleccionDeTags} // Pasa la función de callback
                    tagsSeleccionados={spices} // Pasa los tags seleccionados
                />
            </div>

            {/* BOTONES */}

            <div className="w-full flex flex-row justify-end items-center gap-4 py-10">
                <Boton
                    texto='Atrás'
                    enlace='/register-expert/paso-2'
                    tamano='grande'
                    jerarquia='secundario'
                />
                <BotonSubmit
                    texto="Siguiente"
                    icon="/iconos/iconos-otros/icono-arrow-right.svg"
                />
            </div>

        </form>
    );
}