"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useRegistro } from "@/context/RegistroContext";
import { uploadCloudinary } from '@/lib/uploadCloudinary';
import Input from "@/components/inputs/Input";
import Image from 'next/image';
import Boton from '@/components/buttons/Boton';
import BotonSubmit from "@/components/buttons/BotonSubmit";

export default function Paso1() {

    const router = useRouter();
    const { setRegistroData } = useRegistro();

    // Datos que se piden en este paso:
    const [nombreReal, setNombreReal] = useState('');
    const [name, setName] = useState('');
    const [foto, setFoto] = useState<File | null>(null);
    const [numColegiado, setNumColegiado] = useState('');
    const [anyosExperiencia, setAnyosExperiencia] = useState<number>(0);

    // URL definitiva de Cloudinary:
    const [fotoURL, setFotoURL] = useState("");

    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];

        if (!file) return;

        setFoto(file);
        setIsUploading(true);

        try {
            // Se gestiona la subida de la imagen a Cloudinary:
            const { url } = await uploadCloudinary(file);
            setFotoURL(url);
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        } finally {
            setIsUploading(false);
        }
    };

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setRegistroData({
            nombreReal,
            name,
            foto: fotoURL,
            numColegiado,
            anyosExperiencia: anyosExperiencia | 0,
        });

        router.push('/register-expert/paso-2');
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
            <div className='w-full text-center flex flex-col gap-6 px-col1'>
                <h2 className='w-full'>Información sobre ti</h2>
                <p>Es momento de confeccionar tu perfil. Te recomendamos utilizar datos verídicos que proporcionen confianza al resto de usuarios.</p>
            </div>

            <div className="w-full flex mobile:flex-col laptop:flex-row gap-16 pb-4 pt-8">

                {/* GRUPO FOTO */}

                <div className='w-full flex flex-col justify-between items-center text-center gap-8 p-12 rounded-[2rem] border-dashed border-2 border-[#b0aaaa]'>
                    <Image
                        src={fotoURL ? fotoURL : "/iconos/iconos-otros/icono-camara.svg"}
                        alt='Icono cámara de fotos'
                        width={fotoURL ? 120 : 80}
                        height={fotoURL ? 120 : 80}
                        className={fotoURL && "object-cover rounded-full"}
                    />
                    <div className='flex flex-col gap-4'>
                        <h2>Elige tu foto de perfil</h2>
                        <p>Utiliza una foto profesional en primer plano, en la que se pueda ver tu cara.</p>
                    </div>
                    <input
                        type="file"
                        id="foto"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        required
                    />

                    <label htmlFor="foto" className='opacity-100 cursor-pointer'>
                        <Boton
                            texto="Explorar"
                            tamano="grande"
                            jerarquia="primario"
                        />
                    </label>
                </div>

                {/* GRUPO DATOS */}

                <div className='w-full h-full flex flex-col gap-8'>
                    <div className="w-full">
                        <Input
                            tipo="text"
                            icon={true}
                            id="nombreReal"
                            placeholder="Nombre completo"
                            required={true}
                            value={nombreReal}
                            onChange={(e) => setNombreReal(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <Input
                            tipo="text"
                            icon={true}
                            customIcon="/iconos/iconos-registro/icono-arroba.svg"
                            id="name"
                            placeholder="Nombre de usuario"
                            required={true}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <label className="mb-3 block" htmlFor="numColegiado">Nº de Colegiado</label>
                        <Input
                            tipo="text"
                            icon={true}
                            customIcon='/iconos/iconos-registro/icono-empresa.svg'
                            id="numColegiado"
                            placeholder='---------'
                            required={true}
                            value={numColegiado}
                            onChange={(e) => setNumColegiado(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <label className="mb-3 block" htmlFor="anyosExperiencia">Años de experiencia</label>
                        <Input
                            tipo="number"
                            icon={true}
                            id="anyosExperiencia"
                            required={true}
                            value={anyosExperiencia.toString()}
                            onChange={(e) => setAnyosExperiencia(parseInt(e.target.value))}
                        />
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
                    texto={isUploading ? "Subiendo imagen..." : "Siguiente"}
                    icon="/iconos/iconos-otros/icono-arrow-right.svg"
                    disabled={isUploading}
                />
            </div>

        </form>
    );
}