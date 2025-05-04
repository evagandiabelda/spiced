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
    const [errorSpices, setErrorSpices] = useState('');

    // Gestión de selección de Spices:
    const manejarSeleccionDeTags = (tags: string[]) => {
        setSpices(tags);
    };

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorSpices('');

        // Comprobar que se ha seleccionado al menos un Spice:
        if (spices.length === 0) {
            setErrorSpices('Debes seleccionar al menos un Spice.');
            return;
        }

        // Si todo está bien, guardar en contexto y continuar:
        setRegistroData({
            spices,
        });

        router.push('/register/paso-4');
    }

    return (
        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-center items-center gap-4">
            <div className='w-full text-center flex flex-col gap-6 px-col1'>
                <h2 className='w-full'>¿Cuál es tu Spice?</h2>
                <p>¡Aquí no juzgamos a nadie! No importa si tienes un diagnóstico clínico o simplemente tienes tus sospechas.<br /> En cualquier caso, adelante. Puedes elegir más de una condición.</p>
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
                    enlace='/register/paso-2'
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