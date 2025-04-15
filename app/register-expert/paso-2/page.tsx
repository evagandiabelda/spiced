"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRegistro } from "@/context/RegistroContext";
import Image from 'next/image';
import Boton from '@/components/buttons/Boton';
import BotonSubmit from "@/components/buttons/BotonSubmit";

export default function Paso2() {

    const router = useRouter();
    const { setRegistroData } = useRegistro();

    // Datos que se piden en este paso:
    const [titulaciones, setTitulaciones] = useState<File[]>([]);

    // URL definitiva de Cloudinary:
    const [titulacionesURL, setTitulacionesURL] = useState<string[]>([]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const files = event.target.files;

        if (!files) return;

        const nuevosArchivos = Array.from(files);
        setTitulaciones(prev => [...prev, ...nuevosArchivos]);

        for (const file of nuevosArchivos) {
            const uploadData = new FormData();
            uploadData.append("file", file);

            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadData,
                });

                if (!response.ok) throw new Error("Error subiendo el archivo");

                const data = await response.json();
                setTitulacionesURL(prev => [...prev, data.url]);
            } catch (error) {
                console.error("Error al subir el archivo:", error);
            }
        }
    };

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setRegistroData({
            listaTitulaciones: titulacionesURL,
        });

        router.push('/register-expert/paso-3');
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
            <div className='w-full text-center flex flex-col gap-6 px-col1'>
                <h2 className='w-full'>Títulos y certificaciones</h2>
                <p>Acredita tu condición de profesional de la salud pública adjuntando tus titulaciones y/o certificados profesionales. Estos documentos son necesarios para garantizar la autenticidad de tu perfil y verificarte como usuario Experto.<br />
                    Tus titulaciones NO serán visibles por el resto de usuarios de Spiced.</p>
            </div>

            <div className="w-full flex mobile:flex-col laptop:flex-row gap-16 pb-4 pt-8">

                {/* GRUPO CARD */}

                <div className='w-full flex flex-col justify-between items-center text-center gap-8 p-12 rounded-[2rem] border-dashed border-2 border-[#b0aaaa]'>
                    <Image
                        src="/iconos/iconos-otros/icono-camara.svg"
                        alt='Icono cámara de fotos'
                        width={80}
                        height={80}
                    />
                    <div className='flex flex-col gap-4'>
                        <h2>Añade tus archivos</h2>
                        <p>Puedes subir archivos en formato PDF, JPG o PNG.</p>
                    </div>
                    <input
                        type="file"
                        id="titulacion"
                        accept=".pdf,image/jpeg,image/png"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    <label htmlFor="titulacion" className='opacity-100 cursor-pointer'>
                        <Boton
                            texto="Explorar"
                            tamano="grande"
                            jerarquia="primario"
                        />
                    </label>
                </div>

                {/* GRUPO SUBIDOS */}

                <div className='w-full h-full flex flex-col gap-8'>
                    <div className='w-full flex flex-col gap-4'>
                        {titulaciones.map((archivo, index) => (
                            <div key={index} className='text-sm text-gray-600'>
                                {archivo.name}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* BOTONES */}

            <div className="w-full flex flex-row justify-end items-center gap-4">
                <Boton
                    texto='Cancelar'
                    enlace='/'
                    tamano='grande'
                    jerarquia='secundario'
                />
                <BotonSubmit
                    texto="Siguiente"
                    icon="/iconos/iconos-otros/icono-arrow-right.svg"
                    disabled={titulacionesURL.length === 0}
                />
            </div>

        </form>
    );
}