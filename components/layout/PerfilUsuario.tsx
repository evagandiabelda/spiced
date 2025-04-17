"use client";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import ListaFeedUsuario from '@/components/cards/ListaFeedUsuario';
import AvatarOtros from "@/components/icons/AvatarOtros";
import Image from "next/image";
import Boton from '@/components/buttons/Boton';

interface UserData {
    id: string;
    nombre_completo: string;
    name: string;
    foto: string;
    descripcion_perfil: string;
    usuario_verificado: boolean;
    spices_seguidos: {
        spice: {
            id: string;
            nombre: string;
        }
    }[];
    categorias_seguidas: {
        categoria: {
            id: string;
            nombre: string;
        }
    }[];
    shares_publicados: {
        share: {
            id: string;
            titulo: string;
            texto: string;
            img_principal: string;
            share_verificado: boolean;
            slug: string;
            spices: {
                spice: {
                    id: string;
                    nombre: string;
                }
            }[];
            categorias: {
                categoria: {
                    id: string;
                    nombre: string;
                }
            }[];
        }
    }
}

interface PerfilUsuarioProps {
    name: string;
}

export default function PerfilUsuario({ name }: PerfilUsuarioProps) {

    const { data: session } = useSession();

    const [usuario, setUsuario] = useState<UserData>(Object);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/users/${name}`);

                if (!response.ok) {
                    throw new Error("Error al recuperar los datos del usuario.");
                }

                const usuario = await response.json();

                if (!usuario) {
                    setError("Este usuario no existe.");
                } else {
                    setUsuario(usuario);
                }
            } catch (err) {
                setError("No se pudo cargar la información del usuario.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsuario();
    }, [name]);

    return (
        <div className="w-full flex flex-col items-center gap-12 px-col1 py-[3rem]">

            {/* Cabecera 'Volver' */}

            <div className="w-full flex flex-row items-center gap-4">
                <Image
                    src="/iconos/iconos-otros/icono-flecha-desplegar.svg"
                    alt="Volver al Feed"
                    width={12}
                    height={12}
                    className="rotate-90"
                />
                <a href="/explorar" className="text-[var(--gris3)]">Volver</a>
            </div>

            {/* Datos Usuario */}

            <div className="w-full flex flex-row gap-8 px-col1 pb-12 border-b border-b-1 border-b-[#b0aaaa]">

                <div className="w-col1">
                    <AvatarOtros autor={usuario} />
                </div>

                <div className='w-full flex flex-col items-center pt-7 gap-12'>
                    <div className='w-full flex flex-row justify-between gap-8'>
                        <div className='w-full flex flex-col gap-4'>
                            <h3>{usuario.nombre_completo}</h3>
                            <div className='w-full flex flex-row items-center gap-2'>
                                <p className='text-[0.8rem] text-[var(--gris3)] font-bold'>@{usuario.name}</p>
                                <Image
                                    src="/iconos/iconos-otros/icono-verificado-relleno2.svg"
                                    alt='usuario verificado'
                                    width={16}
                                    height={16}
                                    className='opacity-70'
                                />
                            </div>
                        </div>
                        <div className='w-full flex flex-row justify-end items-center gap-2'>
                            <p className='font-bold text-[var(--insignia1)]'>Pequeño Saltamontes</p>
                            <Image
                                src="/iconos/iconos-otros/icono-insignia-mini-1.svg"
                                alt='icono insignia'
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                    <div className='w-full'>
                        <p className='text-[0.9rem]'>{usuario.descripcion_perfil}</p>
                    </div>
                    <div className='w-full flex flex-row justify-between gap-8'>
                        <div className='w-full flex flex-wrap gap-4'>
                            {/* SPICES DEL USUARIO */}
                        </div>
                        <div className='w-full flex flex-row justify-end items-center gap-6'>
                            <Boton
                                texto='Enviar una pingüinada'
                                tamano='pequeno'
                                jerarquia='secundario'
                            />
                            <Boton
                                texto='Seguir su contenido'
                                tamano='pequeno'
                                jerarquia='primario'
                                icon='/iconos/iconos-otros/icono-agregar.svg'
                            />
                        </div>
                    </div>

                </div>

            </div>

            {/* Shares del Usuario */}

            <div className='w-full flex flex-col items-center gap-10'>
                <h3>Sus Shares</h3>
                <div className='w-full flex flex-col items-center'>
                    <ListaFeedUsuario idAutor={usuario.id} nameAutor={usuario.name} />
                </div>
            </div>

        </div>
    );

}