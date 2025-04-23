'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegistro } from "@/context/RegistroContext";
import NubeTagsDinamica from "@/components/buttons/NubeTagsDinamica";
import BotonSubmit from "@/components/buttons/BotonSubmit";

export default function BloqueTags() {

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

        router.push('/register');
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center mobile:px-col1 tablet:px-col2 gap-12">
            <div className="w-full flex flex-col items-center gap-8">
                <h1 className="dark:text-[var(--gris3)]">Veamos qué te interesa</h1>
                <p>Descubre contenido basado en tu condición. Puedes seleccionar una o varias etiquetas para empezar a componer tu tablero de intereses.</p>
            </div>
            <div className="w-full">
                <NubeTagsDinamica
                    uso='register'
                    defaultActive={true}
                    onSeleccionarTags={manejarSeleccionDeTags} // Pasa la función de callback
                    tagsSeleccionados={spices} // Pasa los tags seleccionados
                />
            </div>
            <div className="w-full flex flex-row justify-center items-center gap-4">
                <BotonSubmit
                    texto="Empezar"
                />
            </div>
        </form>
    );
}
