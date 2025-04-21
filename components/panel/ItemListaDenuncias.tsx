"use client";

import React from "react";
import { useRouter } from "next/navigation";
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

const ItemListaDenuncias = ({ motivo, fecha, share, comentario, user, onDeleteShare, onDeleteComentario }: ItemProps) => {

    const router = useRouter();
    const objetoFecha = new Date(fecha);

    return (
        <li className="w-full flex-1 flex flex-col mobile:items-start tablet:items-center gap-4 px-4 py-8 border-b border-b-1">

            <div id="caja-denuncia" className="w-full flex-1 flex flex-col justify-between gap-4">

                <div className="w-full flex mobile:flex-col-reverse laptop:flex-row tablet:justify-between items-center mobile:gap-4 laptop:gap-12 px-4">

                    <div className="w-full flex flex-row items-center gap-2">
                        <div className="w-[2.5rem]">
                            <AvatarOtros autor={user} />
                        </div>
                        <p className="font-bold text-[0.9rem]">{user.name}</p>
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
                        <p className="text-[0.9rem]">denuncia:</p>
                    </div>

                    <div className="w-full flex flex-row justify-end text-end">
                        <p><span className="text-[var(--gris2)]">{objetoFecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</span></p>
                    </div>

                </div>

                <div className="w-full flex flex-row items-center gap-3 px-4 py-3 rounded-xl bg-[var(--gris1)]">
                    <div className="w-[1.2rem] h-[1.2rem] pt-[0.1rem]">
                        <Image
                            src="/iconos/iconos-menu/icono-denuncias.svg"
                            alt="icono denuncia"
                            width={16}
                            height={16}
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
                            <p className="text-[0.9rem]">Share denunciado:</p>
                            <h4>{share.titulo}</h4>
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
                            onClick={() => onDeleteShare(share.id)}
                        />
                    </div>

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
                            <p className="text-[0.9rem]">Comentario denunciado:</p>
                            <p><span className="font-bold">"{comentario.texto}"</span></p>
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
                            onClick={() => onDeleteComentario(comentario.share.id)}
                        />
                    </div>

                </div>

            }

        </li>
    );
};

export default ItemListaDenuncias;
