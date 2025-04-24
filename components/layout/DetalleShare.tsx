"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import AvatarOtros from "@/components/icons/AvatarOtros";
import Boton from "@/components/buttons/Boton";
import Tag from "@/components/buttons/Tag";
import ComentarioForm from "@/components/inputs/forms/comentario-form";
import Comentario from "@/components/cards/Comentario";
import Modal from "@/components/layout/Modal";
import DenunciaForm from "@/components/inputs/forms/denuncia-form";

interface Share {
    id: string;
    titulo: string;
    texto: string;
    img_principal: string | "/imgs/blank-image.jpg";
    img_secundaria: string | null;
    created_at: Date;
    share_verificado: boolean;
    slug: string | null;
    autor: {
        id: string;
        name: string;
        foto: string;
        usuario_verificado: boolean;
    };
    spices: {
        spice: {
            id: string;
            nombre: string;
        };
    }[];
    categorias: {
        categoria: {
            id: string;
            nombre: string;
        };
    }[];
    comentarios: {
        id: string;
        texto: string;
        created_at: Date;
        user: {
            id: string;
            name: string;
            foto: string;
            usuario_verificado: boolean;
        };
    }[];
}

interface DetalleShareProps {
    slug: string;
}

export default function DetalleShare({ slug }: DetalleShareProps) {

    const { data: session } = useSession();
    const router = useRouter();

    const [share, setShare] = useState<Share>();
    const [isFollowing, setIsFollowing] = useState(false);
    const [shareGuardado, setShareGuardado] = useState(false);
    const [estaVerificado, setEstaVerificado] = useState(false);

    const [mostrarDenuncia, setMostrarDenuncia] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchShare = async () => {

            try {
                const response = await fetch(`/api/shares/${slug}`);
                if (!response.ok) {
                    throw new Error("No se ha podido recuperar la información.");
                }

                const data = await response.json();
                const share: Share = data.share;
                const siguiendo: boolean = data.siguiendo;
                const guardado: boolean = data.guardado;

                if (!share) {
                    throw new Error("No se ha encontrado el Share.");
                } else {
                    setShare(share);
                    setIsFollowing(siguiendo);
                    setShareGuardado(guardado);
                }
            } catch (error) {
                throw new Error("Error cargando el Share.");
            }
        };

        fetchShare();
    }, []);

    // Parsear fecha de publicación:

    const objetoFecha = new Date(share?.created_at ?? Date.now());

    // Gestionar la acción de Seguir al Autor del Share:

    const handleToggleFollow = async () => {

        if (!share) return;

        try {

            const response = await fetch("/api/users/me/siguiendo", {
                method: isFollowing ? "DELETE" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ seguido_id: share.autor.id }), // el ID del autor del share
            });

            if (!response.ok) {
                throw new Error("Error en la petición.");
            }

            setIsFollowing(!isFollowing); // Invertimos el estado
        } catch (error) {
            toast.error("Error al seguir/dejar de seguir al autor del Share.");
        }
    }

    // Gestionar la acción de guardar / olvidar:

    const handleToggleGuardado = async () => {

        if (!share) return;

        try {

            const res = await fetch(`/api/users/me/shares/guardados`, {
                method: shareGuardado ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ share_id: share.id }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Error al guardar/olvidar el Share.');
            }

            setShareGuardado(!shareGuardado)
        } catch (error: any) {
            toast.error("Error al guardar/olvidar el Share.");
        }
    }

    // Gestionar la acción de Verificar el Share:

    const confirmarVerificacion = async () => {

        if (!session?.user.usuario_verificado) {
            return;
        }

        setIsModalOpen(false); // Cierra el modal
        await handleVerificarShare(); // Ejecuta la función original

    };

    const handleVerificarShare = async () => {

        if (!session?.user.usuario_verificado || !share) {
            return;
        }

        try {
            const res = await fetch("/api/users/me/shares/verificados", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ shareId: share.id }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Error al verificar el Share.");
            }

            toast.success("Has verificado este Share.");
            setEstaVerificado(true);
            router.refresh();
        } catch (error) {
            toast.error("Error al verificar el Share.");
        }
    };

    // Gestionar la acción de responder a otro comentario:

    const comentarioFormRef = useRef<HTMLDivElement>(null);
    const [respondiendoA, setRespondiendoA] = useState<string | null>(null);

    const handleResponderClick = (username: string) => {
        setRespondiendoA(username);
        comentarioFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }


    return (
        <div className="w-full flex flex-col items-center gap-16 pb-[160px]">

            {/* CABECERA */}
            {share &&
                <div className="w-full min-h-[500px] max-h-[600px] flex mobile:flex-col laptop:flex-row">
                    <div className="relative mobile:w-full laptop:w-2/3 mobile:h-[400px] laptop:h-full">
                        <Image
                            src={share.img_principal}
                            alt="miniatura"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="w-full h-full flex flex-col justify-center gap-8 mobile:p-col1 tablet:p-20 bg-black/5 dark:bg-white/5">
                        <div className="flex flex-row gap-4 items-center">
                            <Image
                                src="/iconos/iconos-genericos/icono-spiced.svg"
                                alt="miniatura"
                                width={15}
                                height={15}
                                className="object-cover"
                            />
                            <h4>{share.categorias.map(({ categoria }) => (
                                categoria.nombre
                            )).join(", ")}</h4>
                        </div>
                        <h1>{share.titulo}</h1>
                    </div>
                </div>
            }


            {/* CONTENIDO */}
            {share &&
                <div className="w-full flex mobile:flex-col laptop:flex-row gap-col1 mobile:px-col1 laptop:px-col2">

                    {/* Sidebar */}
                    <div className="mobile:w-full laptop:w-col3 flex flex-col gap-2">

                        <div className="w-full flex flex-col gap-8 border-b border-b-1 border-b-[var(--gris2)] px-2 pb-12">
                            <div className="w-full flex mobile:flex-row laptop:flex-col mobile:items-center laptop:items-start gap-4">
                                <div className="max-w-[6rem] pl-2">
                                    <AvatarOtros autor={share.autor} />
                                </div>
                                <div className="flex flex-row gap-2 pl-2">
                                    <a href="#"><h4>@{share.autor.name}</h4></a>
                                    {share.autor.usuario_verificado && <Image
                                        src="/iconos/iconos-otros/icono-verificado-relleno2.svg"
                                        alt="Verificado"
                                        width={16}
                                        height={16}
                                    />}
                                </div>
                            </div>
                            {session
                                && session?.user.userType !== "admin"
                                && share.autor.id !== session?.user.id
                                && <Boton
                                    texto={isFollowing ? "Dejar de seguir" : "Seguir contenido"}
                                    onClick={handleToggleFollow}
                                    tamano="pequeno"
                                    jerarquia={isFollowing ? "secundario" : "primario"}
                                />
                            }
                        </div>

                        <div className="w-full flex flex-col gap-8 border-b border-b-1 border-b-[var(--gris2)] px-2 pt-8 pb-12">
                            <div className="w-full flex flex-col gap-3">
                                <h4 className="pl-2">Sobre este share:</h4>
                            </div>
                            <div className="w-full flex flex-col gap-6 px-2">
                                {estaVerificado &&
                                    <div className="flex flex-row gap-2">
                                        <p className="font-bold text-[var(--gris4)] text-[0.9rem]">Verificado</p>
                                        <Image
                                            src="/iconos/iconos-otros/icono-verificado-relleno2.svg"
                                            alt="Verificado"
                                            width={16}
                                            height={16}
                                        />
                                    </div>
                                }
                                <div>
                                    <p className="mobile:hidden tablet:block font-bold text-[0.8rem] text-[var(--gris2)]">Publicado el:</p>
                                    <p className="font-bold text-[0.8rem] text-[var(--gris2)]">
                                        {objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {share.spices.map(({ spice }) => (
                                        <Tag key={spice.id} nombre={spice.nombre} tamano="pequeno" isActive={true} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-6 px-2 mobile:py-0 laptop:py-8">
                            {session
                                && session?.user.userType !== "admin"
                                && share.autor.id !== session?.user.id
                                && <a href="#" onClick={() => setMostrarDenuncia(true)} className="text-[0.8rem] font-bold underline text-[var(--gris2)] hover:text-[var(--gris4)] transition ease">Denunciar contenido inapropiado</a>
                            }
                            {session
                                && session?.user.userType !== "admin"
                                && share.autor.id !== session?.user.id
                                && <Boton
                                    texto={shareGuardado ? "Olvidar" : "Guardar"}
                                    onClick={handleToggleGuardado}
                                    tamano="pequeno"
                                    jerarquia={shareGuardado ? "secundario" : "primario"}
                                    icon="/iconos/iconos-menu/icono-guardado.svg"
                                />}
                            {/* Si el usuario en sesión está verificado, si el autor del Share es Standard y si el Share todavía NO ha sido verificado: */}
                            {session?.user.usuario_verificado
                                && share.autor.usuario_verificado === false
                                && estaVerificado === false
                                && (
                                    <div>
                                        <Boton
                                            texto={estaVerificado ? "Verificado" : "Verificar"}
                                            onClick={() => setIsModalOpen(true)}
                                            tamano="pequeno"
                                            jerarquia="secundario"
                                            icon="/iconos/iconos-otros/icono-verificado-relleno2.svg"
                                            deshabilitado={estaVerificado}
                                        />
                                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                            <div className="flex flex-col gap-4">
                                                <p className="text-sm">
                                                    Al verificar este Share, confirmas que toda la información que contiene es <strong>cierta</strong> y <strong>contrastable</strong>. Esta acción no se puede deshacer, pero puede ser revisada por los administradores de Spiced.
                                                </p>
                                                <div className="flex justify-end gap-2 pt-4">
                                                    <Boton texto="Cancelar" jerarquia="secundario" tamano="pequeno" onClick={() => setIsModalOpen(false)} />
                                                    <Boton texto="Confirmar verificación" jerarquia="primario" tamano="pequeno" onClick={confirmarVerificacion} />
                                                </div>
                                            </div>
                                        </Modal>
                                    </div>
                                )}
                        </div>

                    </div>

                    {/* Artículo */}
                    <div className="w-full flex flex-col items-start gap-4">
                        {share.texto.split("\n").map((parrafo, index) => (
                            <React.Fragment key={index}>
                                {/* Renderizamos el primer párrafo + la imagen secundaria (si hay) */}
                                {index === 1 && share.img_secundaria && (
                                    <div className="relative w-full h-[300px] my-8">
                                        <Image
                                            src={share.img_secundaria}
                                            alt="imagen secundaria"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                {/* Renderizamos el resto de párrafos */}
                                <p className="text-[1.2rem]">{parrafo}</p>
                            </React.Fragment>
                        ))}
                        <div className="inline-block px-2 pt-8 pb-20">
                            <Boton
                                texto="Volver al Feed"
                                enlace="/explorar"
                                tamano="pequeno"
                                jerarquia="secundario"
                                icon="/iconos/iconos-otros/icono-arrow-left.svg"
                            />
                        </div>

                        {/* Comentarios */}
                        <div className="w-full flex flex-col items-start gap-16 py-12 border-t border-gray-400">

                            {session &&
                                <div ref={comentarioFormRef} className="w-full">
                                    <ComentarioForm
                                        slug={slug}
                                        usernameRespondiendoA={respondiendoA}
                                    />
                                </div>
                            }

                            <div className="w-full flex flex-col items-start gap-8">
                                {share.comentarios.map((comentario, index) => (
                                    <Comentario
                                        key={index}
                                        id={comentario.id}
                                        texto={comentario.texto}
                                        fecha={comentario.created_at}
                                        user={comentario.user}
                                        sessionUserId={session?.user.id}
                                        slug={slug}
                                        onResponderClick={handleResponderClick}
                                    />
                                ))}
                            </div>

                        </div>

                    </div>

                </div>
            }

            <Modal isOpen={mostrarDenuncia} onClose={() => setMostrarDenuncia(false)}>
                <DenunciaForm
                    slug={slug}
                    onClose={() => setMostrarDenuncia(false)}
                />
            </Modal>

        </div>
    );
}
