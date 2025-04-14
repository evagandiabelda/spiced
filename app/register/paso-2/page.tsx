"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRegistro } from "@/components/RegistroContext";
import InputFile from '@/components/inputs/InputFile';
import Image from 'next/image';
import Boton from '@/components/buttons/Boton';
import BotonSubmit from "@/components/buttons/BotonSubmit";

export default function Paso2() {

    const router = useRouter();
    const { setRegistroData } = useRegistro();

    // Datos que se piden en este paso:
    const [foto, setFoto] = useState<File | null>(null);

    // Gestión de carga de imagen:
    const [formData, setFormData] = useState({
        foto: "",
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];

        if (file) {
            setFoto(file);
        } else {
            return;
        }

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {

            // En la petición '/api/upload' se gestiona la subida de la imagen a Cloudinary:
            const response = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            if (!response.ok) throw new Error("Error subiendo la imagen");

            const data = await response.json();

            // Actualizar el estado global de formData:
            setFormData((prev) => ({
                ...prev,
                foto: data.url,
            }));


        } catch (error) {
            console.error("Error al subir la imagen:", error);
        }
    };

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setRegistroData({
            foto: formData.foto,
        });

        router.push('/register/paso-3');
    }

    return (
        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center gap-8">
            <div className='w-full text-center flex flex-col gap-6 px-col1'>
                <h2 className='w-full'>Elige tu foto de perfil</h2>
                <p>Haz click en el gatito para cargar tu foto.<br /> Si no quieres mostrar tu cara, se te asignará un gatito de oficio.</p>
            </div>

            <div className="w-full flex flex-col justify-start items-center gap-8 pt-4">

                <label
                    htmlFor="foto"
                    className="w-[360px] h-[360px] rounded-[800px] cursor-pointer hover:scale-[1.03] transition ease-in-out"
                >
                    <Image
                        src={
                            foto
                                ? URL.createObjectURL(foto)
                                : "/iconos/iconos-registro/gatitos/icono-gato-00.svg"
                        }
                        alt="foto de perfil"
                        width={300}
                        height={300}
                        className="w-[300px] h-[300px] object-cover rounded-full"
                    />
                </label>

                <input
                    type="file"
                    id="foto"
                    name="foto"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

            </div>

            {/* BOTONES */}

            <div className="w-full flex flex-row justify-end items-center gap-4">
                <Boton
                    texto='Atrás'
                    enlace='/register/paso-1'
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