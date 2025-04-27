"use client";

import React from "react";
import { useState } from "react";
import Modal from "@/components/layout/Modal";
import AvatarOtros from "@/components/icons/AvatarOtros";
import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface ItemProps {
    motivo: string;
    fecha: Date;

    share?: {
        id: string;
        titulo: string;
        img_principal: string;
        slug: string;
        autor: { // Denunciado
            name: string;
        }
    } | undefined;

    comentario?: {
        texto: string;
        user: { // Denunciado
            name: string;
        }
        share: {
            id: string;
            img_principal: string;
            slug: string;
        }
    } | undefined;

    user: { // Denunciante
        id: string;
        name: string;
        foto: string;
        usuario_verificado: boolean;
    };

    onDeleteShare?: (id: string) => void;
    onDeleteComentario?: (id: string) => void;
}

export default function ItemListaDenuncias({ motivo, fecha, share, comentario, user, onDeleteShare, onDeleteComentario }: ItemProps) {

    const objetoFecha = new Date(fecha);
    const [isModalShareOpen, setIsModalShareOpen] = useState(false);
    const [isModalComentarioOpen, setIsModalComentarioOpen] = useState(false);

    return (
        <li className="w-full flex-1 flex flex-col mobile:items-start tablet:items-center gap-4 px-4 py-8 border-b border-b-1 dark:border-[var(--gris4)]">

            <div id="caja-denuncia" className="w-full flex-1 flex flex-col justify-between gap-4">

                <div className="w-full flex mobile:flex-col-reverse laptop:flex-row tablet:justify-between items-center mobile:gap-4 laptop:gap-12 tablet:px-4">

                    <div className="w-full flex flex-row items-center gap-2">
                        <div className="w-[2.5rem]">
                            <AvatarOtros autor={user} />
                        </div>
                        <p className="font-bold text-[0.9rem] dark:text-[var(--gris3)]">{user.name}</p>
                        {user.usuario_verificado &&
                            <div className="w-[1.2rem] h-[1.2rem]">
                                <Image
                                    src="/iconos/iconos-otros/icono-verificado-relleno.svg"
                                    alt="verificado"
                                    width={14}
                                    height={14}
                                />
                            </div>
                        }
                        <p className="text-[0.9rem] dark:text-[var(--gris3)]">denuncia:</p>
                    </div>

                    <div className="w-full flex flex-row justify-end text-end">
                        <p><span className="text-[var(--gris2)] dark:text-[var(--gris3)]">{objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</span></p>
                    </div>

                </div>

                <div className="w-full flex flex-row items-center gap-3 px-4 py-3 rounded-xl bg-[var(--gris1)] dark:bg-[var(--gris4)]">
                    <div className="w-[1.2rem] h-[1.2rem] pt-[0.1rem]">
                        <Image
                            src="/iconos/iconos-menu/icono-denuncias.svg"
                            alt="icono denuncia"
                            width={16}
                            height={16}
                            className="dark:invert"
                        />
                    </div>
                    <p><span>"{motivo}"</span></p>
                </div>

            </div>

            {share && onDeleteShare &&

                <div className="w-full flex mobile:flex-col laptop:flex-row items-center mobile:gap-8 laptop:gap-12 px-4 py-2">

                    <div className="w-full flex flex-row items-center gap-3">
                        <div className="relative w-[3rem] h-[3rem]">
                            <Image
                                src={share.img_principal}
                                alt="miniatura share"
                                fill
                                className="rounded-xl object-cover"
                            />
                        </div>
                        <div className="w-full flex flex-col flex-1 gap-1">
                            <p className="text-[0.9rem] dark:text-[var(--gris3)]">Share denunciado:</p>
                            <h4 className="dark:text-[var(--gris3)]">{share.titulo}</h4>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-end items-center gap-3">
                        <Boton
                            texto="Ver"
                            enlace={`/share/${share.slug}`}
                            tamano="pequeno"
                            jerarquia="secundario"
                        />
                        <Boton
                            texto="Eliminar Share"
                            tamano="pequeno"
                            jerarquia="primario"
                            onClick={() => setIsModalShareOpen(true)}
                        />
                    </div>

                    <Modal isOpen={isModalShareOpen} onClose={() => setIsModalShareOpen(false)}>
                        <div className="flex flex-col gap-6">
                            <div className="w-full flex flex-col items-center text-center gap-4">
                                <Image
                                    src="/iconos/iconos-genericos/icono-spiced.svg"
                                    alt="miniatura"
                                    width={15}
                                    height={15}
                                    className="object-cover"
                                />
                                <h3>Eliminar Share</h3>
                            </div>
                            <p className="text-sm text-center">¿Seguro que quieres eliminar este Share?</p>
                            <div className="flex justify-center gap-2">
                                <Boton texto="Cancelar" jerarquia="secundario" tamano="pequeno" onClick={() => setIsModalShareOpen(false)} />
                                <Boton texto="Eliminar" jerarquia="primario" tamano="pequeno" onClick={() => onDeleteShare(share.id)} />
                            </div>
                        </div>
                    </Modal>

                </div>

            }

            {comentario && onDeleteComentario &&

                <div className="w-full flex mobile:flex-col laptop:flex-row items-center mobile:gap-8 laptop:gap-12 px-4 py-2">

                    <div className="w-full flex flex-row items-center gap-3">
                        <div className="relative w-[3rem] h-[3rem]">
                            <Image
                                src={comentario.share.img_principal}
                                alt="miniatura share"
                                fill
                                className="rounded-xl object-cover"
                            />
                        </div>
                        <div className="w-full flex flex-col flex-1 gap-2">
                            <p className="text-[0.9rem] dark:text-[var(--gris3)]">Comentario denunciado:</p>
                            <p><span className="font-bold dark:text-[var(--gris3)]">"{comentario.texto}"</span></p>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-end items-center gap-3">
                        <Boton
                            texto="Ver"
                            enlace={`/share/${comentario.share.slug}`}
                            tamano="pequeno"
                            jerarquia="secundario"
                        />
                        <Boton
                            texto="Eliminar Comentario"
                            tamano="pequeno"
                            jerarquia="primario"
                            onClick={() => setIsModalComentarioOpen(true)}
                        />
                    </div>

                    <Modal isOpen={isModalComentarioOpen} onClose={() => setIsModalComentarioOpen(false)}>
                        <div className="flex flex-col gap-6">
                            <div className="w-full flex flex-col items-center text-center gap-4">
                                <Image
                                    src="/iconos/iconos-genericos/icono-spiced.svg"
                                    alt="miniatura"
                                    width={15}
                                    height={15}
                                    className="object-cover"
                                />
                                <h3>Eliminar Comentario</h3>
                            </div>
                            <p className="text-sm text-center">¿Seguro que quieres eliminar este comentario?</p>
                            <div className="flex justify-center gap-2">
                                <Boton texto="Cancelar" jerarquia="secundario" tamano="pequeno" onClick={() => setIsModalComentarioOpen(false)} />
                                <Boton texto="Eliminar" jerarquia="primario" tamano="pequeno" onClick={() => onDeleteComentario(comentario.share.id)} />
                            </div>
                        </div>
                    </Modal>

                </div>

            }

        </li>
    );
};