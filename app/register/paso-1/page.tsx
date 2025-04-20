"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRegistro } from "@/context/RegistroContext";
import Input from "@/components/inputs/Input";
import Image from 'next/image';
import Boton from '@/components/buttons/Boton';
import BotonSubmit from "@/components/buttons/BotonSubmit";

// Opciones para las cards de Género:
const opcionesGenero = [
    { valor: "Femenino", icono: "/iconos/iconos-registro/avatar-genero-fem.svg", texto: "Femenino" },
    { valor: "Masculino", icono: "/iconos/iconos-registro/avatar-genero-mas.svg", texto: "Masculino" },
    { valor: "No-binario", icono: "/iconos/iconos-registro/avatar-genero-sin.svg", texto: "Neutro" },
];

export default function Paso1() {

    const router = useRouter();
    const { setRegistroData } = useRegistro();

    // Datos que se piden en este paso:
    const [nombreReal, setnombreReal] = useState('');
    const [name, setName] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setRegistroData({
            nombreReal,
            name,
            fechaNacimiento,
            genero,
        });

        router.push('/register/paso-2');
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
            <div className='w-full text-center flex flex-col gap-6 px-col1'>
                <h2 className='w-full'>Información básica</h2>
                <p>Estos datos nos ayudarán a ofrecerte contenido más personalizado.<br /> Prometemos no usarlos para nada más.</p>
            </div>

            <div className="w-full flex flex-col flex-1 align-center gap-8 pb-4 pt-8">

                <div className='w-full flex mobile:flex-col laptop:flex-row gap-10'>

                    {/* GRUPO 1 */}

                    <div className="w-full flex flex-col gap-4">

                        <div className="w-full">
                            <label className="mb-3 mt-5 block" htmlFor="email">¿Cómo te llamas?</label>
                            <Input
                                tipo="text"
                                icon={true}
                                id="nombreReal"
                                placeholder="Tu nombre"
                                required={true}
                                value={nombreReal}
                                onChange={(e) => setnombreReal(e.target.value)}
                            />
                        </div>

                        <div className="w-full">
                            <label className="mb-3 mt-5 block" htmlFor="password">Elige un nombre de usuario único</label>
                            <Input
                                tipo="text"
                                icon={true}
                                id="name"
                                placeholder="@usuario_ejemplo"
                                required={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* GRUPO 2 */}

                    <div className="w-full flex flex-col gap-8">

                        <div className="w-full">
                            <label className="mb-3 mt-5 block" htmlFor="email">Tu fecha de nacimiento</label>
                            <Input
                                tipo="date"
                                icon={true}
                                id="fechaNacimiento"
                                required={true}
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </div>

                    </div>

                </div>

                {/* GRUPO 3 */}

                <div className='w-full flex flex-col gap-2'>
                    <label className="mb-3 mt-5 block" htmlFor="email">¿Cómo nos referimos a ti?</label>
                    <div className="grid grid-cols-3 gap-4">
                        {opcionesGenero.map((opcion) => (
                            <div
                                key={opcion.valor}
                                onClick={() => setGenero(opcion.valor)}
                                className={`flex flex-col items-center justify-center gap-6 bg-white border-2 rounded-xl drop-shadow-lg p-6 cursor-pointer transition-all ${genero === opcion.valor
                                    ? "border-[#FF9486]"
                                    : "border-white hover:border-[#FF9486]"
                                    }`}
                            >
                                <Image
                                    src={opcion.icono}
                                    alt="miniatura"
                                    width={120}
                                    height={120}
                                    className="object-cover"
                                />
                                <h3 className='text-[1.2rem] text-[var(--gris4)]'>{opcion.texto}</h3>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* BOTONES */}

            <div className="w-full flex flex-row justify-end items-center gap-4 py-10">
                <Boton
                    texto='Cancelar'
                    enlace='/'
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