"use client";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import type { UserData } from '@/types/user';
import { toast } from "react-hot-toast";
import PerfilUsuarioSkeleton from '@/components/layout/PerfilUsuarioSkeleton';
import ListaFeedUsuario from '@/components/cards/ListaFeedUsuario';
import AvatarOtros from "@/components/icons/AvatarOtros";
import Image from "next/image";
import Tag from '@/components/buttons/Tag';
import Boton from '@/components/buttons/Boton';

// Opciones para las Insignias:
const opcionesInsignia = [
    { valor: "pequeno_saltamontes", icono: "/iconos/iconos-otros/icono-insignia-mini-1.svg", texto: "Pequeño Saltamontes", estiloTexto: "font-bold text-[var(--insignia1)]" },
    { valor: "cacahuete_sabio", icono: "/iconos/iconos-otros/icono-insignia-mini-2.svg", texto: "Cacahuete Sabio", estiloTexto: "font-bold text-[var(--insignia2)]" },
    { valor: "cactus_legendario", icono: "/iconos/iconos-otros/icono-insignia-mini-3.svg", texto: "Cactus Legendario", estiloTexto: "font-bold text-[var(--insignia3)]" },
];

interface PerfilUsuarioProps {
    name: string;
}

export default function PerfilUsuario({ name }: PerfilUsuarioProps) {

    const { data: session } = useSession();

    const [usuario, setUsuario] = useState<UserData>(Object);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [siguiendo, setSiguiendo] = useState<boolean>(false);

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
                    // Verificar si el usuario en sesión ya sigue a este usuario
                    if (usuario?.seguidores?.some((seguimiento: { seguidor_id: string }) => seguimiento.seguidor_id === session?.user.id)) {
                        setSiguiendo(true);
                    }
                }
            } catch (err) {
                setError("No se pudo cargar la información del usuario.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsuario();
    }, [name, session?.user.id]);

    // Función para seguir o dejar de seguir
    const toggleSeguir = async () => {
        try {
            const url = '/api/users/me/siguiendo';
            const method = siguiendo ? 'DELETE' : 'POST'; // Cambiar a DELETE si ya está siguiendo
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ seguido_id: usuario.id }),
            });

            if (!response.ok) {
                throw new Error('Error al seguir o dejar de seguir al usuario.');
            }

            setSiguiendo(!siguiendo); // Cambiar estado del seguimiento
        } catch (error) {
            toast.error("No se pudo realizar la acción.");
        }
    };

    if (loading) {
        return (
            <PerfilUsuarioSkeleton />
        );
    }

    return (
        <div className="w-full flex flex-col items-center gap-12 px-col1 pt-[3rem] pb-32">

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

            <div className="w-full flex mobile:flex-col tablet:flex-row mobile:gap-0 tablet:gap-8 px-col1 pb-12 border-b border-b-1 border-b-[#b0aaaa]">

                <div className="mobile:w-col3 tablet:w-col2 laptop:w-col1">
                    <AvatarOtros autor={usuario} />
                </div>

                <div className='w-full flex flex-col pt-7 mobile:gap-8 tablet:gap-10'>
                    <div className='w-full flex mobile:flex-col laptop:flex-row justify-between items-start gap-8'>
                        <div className='flex flex-col flex-1 gap-4'>
                            <h3>{usuario.nombre_real}</h3>
                            <div className='w-full flex flex-row justify-start items-center gap-2'>
                                <p className='text-[var(--gris2)] dark:text-[var(--gris3)] font-bold'>@{usuario.name}</p>
                            </div>
                        </div>
                        {usuario.usuario_verificado &&
                            <div className='flex flex-row justify-end items-center gap-2'>
                                <p className='text-[0.9rem] font-bold'>Verificado</p>
                                <Image
                                    src="/iconos/iconos-otros/icono-verificado-relleno2.svg"
                                    alt='usuario verificado'
                                    width={16}
                                    height={16}
                                    className='dark:invert'
                                />
                            </div>
                        }
                        {usuario.standard && (
                            <div className='w-full flex flex-row justify-end items-center gap-2'>
                                {(() => {
                                    const insigniaSeleccionada = opcionesInsignia.find(
                                        (insignia) => insignia.valor === usuario.standard?.insignia
                                    );

                                    if (!insigniaSeleccionada) return null;

                                    return (
                                        <>
                                            <p className={insigniaSeleccionada.estiloTexto}>
                                                {insigniaSeleccionada.texto}
                                            </p>
                                            <Image
                                                src={insigniaSeleccionada.icono}
                                                alt={`icono insignia ${insigniaSeleccionada.texto}`}
                                                width={24}
                                                height={24}
                                            />
                                        </>
                                    );
                                })()}
                            </div>
                        )}

                    </div>
                    <div className='mobile:w-full laptop:w-1/2'>
                        <p className='text-[0.9rem] dark:text-[var(--gris3)]'>{usuario.descripcion_perfil}</p>
                    </div>
                    <div className='w-full flex mobile:flex-col laptop:flex-row laptop:justify-between laptop:items-end gap-8'>
                        <div className='w-1/2 flex flex-wrap gap-2'>
                            {usuario.spices_seguidos?.map(({ spice }) => (
                                spice ? (
                                    <Tag key={spice.id} nombre={spice.nombre} tamano="pequeno" isActive={true} />
                                ) : null
                            ))}
                        </div>
                        {usuario.id === session?.user.id &&
                            <div className='w-full flex flex-wrap justify-end items-center gap-4'>
                                <Boton
                                    texto='Editar mi perfil'
                                    enlace={session?.user.userType === "standard" ? "/panel-estandar/configuracion" : "/panel-experto/configuracion"}
                                    tamano='pequeno'
                                    jerarquia='secundario'
                                />
                            </div>
                        }
                        {usuario.id !== session?.user.id &&
                            <div className='w-full flex flex-wrap justify-end items-center gap-4'>
                                <Boton
                                    texto={siguiendo ? 'Dejar de seguir' : 'Seguir su contenido'}
                                    tamano='pequeno'
                                    jerarquia='primario'
                                    icon='/iconos/iconos-otros/icono-agregar.svg'
                                    onClick={toggleSeguir}
                                />
                            </div>
                        }
                    </div>

                </div>

            </div>

            {/* Shares del Usuario */}

            <div className='w-full flex flex-col items-center gap-10'>
                {usuario.id === session?.user.id
                    ? <h3>Tus Shares</h3>
                    : <h3>Sus Shares</h3>
                }

                <div className='w-full flex flex-col items-center'>
                    <ListaFeedUsuario idAutor={usuario.id} nameAutor={usuario.name} />
                </div>
            </div>

        </div>
    );

}