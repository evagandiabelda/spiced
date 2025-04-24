"use client";

import React, { useState } from "react";
import Modal from "@/components/layout/Modal";
import Image from "next/image";
import Input from "@/components/inputs/Input";
import Boton from "@/components/buttons/Boton";

interface ItemProps {
    id: string;
    nombre: string;
    onEdit: (id: string, nuevoNombre: string) => void;
    onDelete: (id: string) => void;
}

export default function ItemListaSpices({ id, nombre, onEdit, onDelete }: ItemProps) {

    const [editando, setEditando] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState(nombre);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGuardar = () => {
        if (nuevoNombre.trim() !== "" && nuevoNombre !== nombre) {
            onEdit(id, nuevoNombre.trim());
        }
        setEditando(false);
    };

    return (
        <li className="w-full flex mobile:flex-col tablet:flex-row justify-between mobile:items-end tablet:items-center mobile:gap-2 tablet:gap-12 px-4 py-6 border-b border-b-[var(--gris2)] dark:border-b-[var(--gris4)]">

            <div className="w-full flex-1 flex flex-row mobile:items-start tablet:items-center gap-4">
                {editando ? (
                    <div className="w-full rounded-xl border border-2 border-[var(--gris2)]">
                        <Input
                            id="editar"
                            tipo="text"
                            value={nuevoNombre}
                            required
                            onChange={(e) => setNuevoNombre(e.target.value)}
                        />
                    </div>
                ) : (
                    <p className="font-bold">{nombre}</p>
                )}
            </div>

            <div id="caja-botones" className="flex flex-row gap-4">

                {editando &&

                    <Boton
                        texto="Cancelar"
                        tamano="pequeno"
                        jerarquia="secundario"
                        onClick={() => setEditando(false)}
                    />
                }

                {editando ? (
                    <Boton
                        texto="Guardar"
                        tamano="pequeno"
                        jerarquia="primario"
                        onClick={handleGuardar}
                    />
                ) : (
                    <Boton
                        texto="Editar"
                        tamano="pequeno"
                        jerarquia="secundario"
                        onClick={() => setEditando(true)}
                    />
                )}

                {!editando &&
                    <Boton texto="Eliminar" tamano="pequeno" jerarquia="secundario" customColor="var(--brand1)" onClick={() => setIsModalOpen(true)} />
                }

            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col gap-6">
                    <div className="w-full flex flex-col items-center text-center gap-4">
                        <Image
                            src="/iconos/iconos-genericos/icono-spiced.svg"
                            alt="miniatura"
                            width={15}
                            height={15}
                            className="object-cover"
                        />
                        <h3>Eliminar Spice</h3>
                    </div>
                    <p className="text-sm text-center">¿Seguro que quieres eliminar este spice?</p>
                    <div className="flex justify-center gap-2">
                        <Boton texto="Cancelar" jerarquia="secundario" tamano="pequeno" onClick={() => setIsModalOpen(false)} />
                        <Boton texto="Eliminar" jerarquia="primario" tamano="pequeno" onClick={() => onDelete(id)} />
                    </div>
                </div>
            </Modal>

        </li>
    );
};