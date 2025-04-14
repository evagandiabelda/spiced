"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRegistro } from "@/components/RegistroContext";
import BentoCategorias from '@/components/cards/BentoCategorias';
import Boton from '@/components/buttons/Boton';
import BotonSubmit from "@/components/buttons/BotonSubmit";

export default function Paso4() {

    const router = useRouter();
    const { setRegistroData } = useRegistro();

    // Datos que se piden en este paso:
    const [categorias, setCategorias] = useState<string[]>([]);

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setRegistroData({
            categorias,
        });

        router.push('/register/paso-3'); // ---------------> CAMBIAR POR LA PETICIÓN POST Y REDIRIGIR AL PANEL DE USUARIO.
    }

    return (
        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center gap-4">
            <div className='w-full text-center flex flex-col gap-6 px-col1'>
                <h2 className='w-full'>Vamos a construir tu feed</h2>
                <p>Elige qué tipo de contenido te gustaría ver. Puedes elegir más de una opción.<br /> ¿No lo tienes claro? ¡No te preocupes! Puedes cambiar esto más adelante.</p>
            </div>

            <BentoCategorias
                onSeleccionChange={(seleccion) => setCategorias(seleccion)}
            />

            {/* BOTONES */}

            <div className="w-full flex flex-row justify-end items-center gap-4 py-10">
                <Boton
                    texto='Atrás'
                    enlace='/register/paso-3'
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