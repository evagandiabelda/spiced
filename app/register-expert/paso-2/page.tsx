"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRegistro } from "@/context/RegistroContext";
import Image from 'next/image';
import Boton from '@/components/buttons/Boton';
import BotonSubmit from "@/components/buttons/BotonSubmit";

type ArchivoSubido = {
    file: File;
    url: string;
    public_id: string;
}

export default function Paso2() {

    const router = useRouter();
    const { setRegistroData } = useRegistro();

    // Datos que se piden en este paso:
    const [titulaciones, setTitulaciones] = useState<ArchivoSubido[]>([]);

    // Formateo para mostrar el tamaño del archivo subido:
    const formatBytes = (bytes: number) => {
        const kb = bytes / 1024;
        return kb < 1024
            ? `${kb.toFixed(1)} KB`
            : `${(kb / 1024).toFixed(1)} MB`;
    };

    // Icono a mostrar según el tipo de archivo subido:

    const setIcono = (tipo: string) => {

        tipo = tipo.toLowerCase();

        if (tipo === "application/pdf") {
            return "/iconos/iconos-otros/icono-archivo-pdf.svg";
        }
        else if (tipo === "image/jpg" || tipo === "image/jpeg") {
            return "/iconos/iconos-otros/icono-archivo-jpg.svg";
        }
        else if (tipo === "image/png") {
            return "/iconos/iconos-otros/icono-archivo-png.svg";
        }

        return "/iconos/iconos-otros/icono-archivo-otros.svg";

    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const files = event.target.files;

        if (!files) return;

        const nuevosArchivos = Array.from(files);

        for (const file of nuevosArchivos) {
            const uploadData = new FormData();
            uploadData.append("file", file);

            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadData,
                });

                if (!response.ok) throw new Error("Error subiendo el archivo");

                const data = await response.json(); // { url, public_id }

                setTitulaciones(prev => [
                    ...prev,
                    {
                        file,
                        url: data.url,
                        public_id: data.public_id,
                    }
                ]);
            } catch (error) {
                console.error("Error al subir el archivo:", error);
            }
        }
    };

    const handleEliminarTitulacion = async (public_id: string) => {
        try {
            // Eliminar de Cloudinary:
            const res = await fetch('/api/upload', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ public_id }),
            });

            if (!res.ok) {
                throw new Error('No se pudo eliminar el archivo.');
            }

            // Eliminar del estado local:
            setTitulaciones(prev =>
                prev.filter(titulacion => titulacion.public_id !== public_id)
            );
        } catch (error) {
            console.error('Error al eliminar archivo.', error);
            // Aquí podrías mostrar un toast o alerta
        }
    };


    // Guardado de datos en contexto y Redirección:
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const urlsTitulaciones = titulaciones.map(t => t.url);

        setRegistroData({
            listaTitulaciones: urlsTitulaciones,
        });

        router.push('/register-expert/paso-3');
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
            <div className='w-full text-center flex flex-col gap-6 px-col1'>
                <h2 className='w-full'>Títulos y certificaciones</h2>
                <p>Acredita tu condición de profesional de la salud pública adjuntando tus titulaciones y/o certificados profesionales. Estos documentos son necesarios para garantizar la autenticidad de tu perfil y verificarte como usuario Experto.</p>
                <p>Tus titulaciones NO serán visibles por el resto de usuarios de Spiced.</p>
            </div>

            <div className="w-full flex mobile:flex-col laptop:flex-row gap-16 pb-4 pt-8">

                {/* GRUPO CARD */}

                <div className='mobile:w-full laptop:w-1/3 flex flex-col justify-between items-center text-center gap-8 p-10 rounded-[2rem] border-dashed border-2 border-[#b0aaaa]'>
                    <Image
                        src="/iconos/iconos-otros/icono-cargar.svg"
                        alt='Icono cargar'
                        width={60}
                        height={60}
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
                        required
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

                <div className='mobile:w-full laptop:w-2/3 h-full flex flex-col gap-8'>
                    <h3>Archivos subidos</h3>
                    {titulaciones.length === 0 && <p className='text-sm text-[var(--gris3)]'>Es necesario cargar al menos un archivo.</p>}
                    <div className='w-full flex flex-col gap-6'>
                        {titulaciones.map((titulacion, index) => (
                            <div key={index} className='w-full flex flex-row justify-between items-center gap-8'>
                                <div className='w-full flex flex-row items-center gap-4'>
                                    <Image
                                        src={setIcono(titulacion.file.type)}
                                        alt='icono archivo subido'
                                        width={34}
                                        height={34}
                                        className='object-contain'
                                    />
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-sm text-[var(--gris3)]'>{titulacion.file.name}</p>
                                        <p className='text-xs font-bold'>{formatBytes(titulacion.file.size)}</p>
                                    </div>
                                </div>
                                <div className='pb-2'>
                                    <Image
                                        src="/iconos/iconos-otros/icono-papelera.svg"
                                        alt='icono borrar'
                                        width={20}
                                        height={20}
                                        className='object-contain cursor-pointer hover:scale-[1.1] transition ease'
                                        onClick={() => handleEliminarTitulacion(titulacion.public_id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* BOTONES */}

            <div className="w-full flex flex-row justify-end items-center gap-4">
                <Boton
                    texto='Atrás'
                    enlace='/register-expert/paso-1'
                    tamano='grande'
                    jerarquia='secundario'
                />
                <BotonSubmit
                    texto="Siguiente"
                    icon="/iconos/iconos-otros/icono-arrow-right.svg"
                    disabled={titulaciones.length === 0}
                />
            </div>

        </form>
    );
}