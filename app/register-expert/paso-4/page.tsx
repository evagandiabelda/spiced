"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRegistro } from "@/context/RegistroContext";
import BentoCategorias from '@/components/cards/BentoCategorias';
import Boton from '@/components/buttons/Boton';
import BotonSubmit from "@/components/buttons/BotonSubmit";

export default function Paso4() {

    const router = useRouter();
    const {
        email,
        password,
        nombreReal,
        name,
        foto,
        spices,
        numColegiado,
        anyosExperiencia,
        listaTitulaciones,
        setRegistroData,
    } = useRegistro();

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Datos que se piden en este paso:
    const [categorias, setCategorias] = useState<string[]>([]);

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);
        setError(null);

        setRegistroData({
            categorias,
        });

        // Datos acumulados:
        const datosRegistroCompleto = {
            email,
            password,
            nombre_real: nombreReal,
            name,
            foto,
            spices,
            categorias,
            num_colegiado: numColegiado,
            anyos_experiencia: anyosExperiencia,
            lista_titulaciones: listaTitulaciones,
        };

        console.log(datosRegistroCompleto);

        try {
            const res = await fetch('/api/auth/register/expert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosRegistroCompleto),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Error al registrar usuario');
            }

            router.push('/panel-experto');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error inesperado');
        } finally {
            setCargando(false);
        }
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
                    enlace='/register-expert/paso-3'
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