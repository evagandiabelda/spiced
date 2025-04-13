"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRegistro } from "@/components/RegistroContext";
import Input from "@/components/inputs/Input";
import Boton from '@/components/buttons/Boton';
import BotonSubmit from "@/components/buttons/BotonSubmit";

export default function Paso2() {

    const router = useRouter();
    const { setRegistroData } = useRegistro();

    // Datos que se piden en este paso:
    const [foto, setFoto] = useState('');

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setRegistroData({
            foto,
        });

        router.push('/register/paso-3');
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-8">
            {/* Contenido... */}
        </div>
    );
}