"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Input from "@/components/inputs/Input";
import Boton from "@/components/buttons/Boton";
import ListaCategorias from "@/components/panel/ListaCategorias";

export default function Categorias() {

    const { status } = useSession();
    const router = useRouter();

    const [editando, setEditando] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState("");
    const [refrescar, setRefrescar] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // Redirigir si no está autenticado
        }
    }, [status, router]);

    const handleCrearCategoria = async () => {
        if (!nuevoNombre.trim()) return;

        try {
            const res = await fetch("/api/categorias", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre: nuevoNombre }),
            });

            if (!res.ok) {
                throw new Error("Error al crear la categoría");
            }

            setNuevoNombre("");
            setEditando(false);
            setRefrescar((prev) => !prev); // Alterna para forzar el refresh
            toast.success("Categoría añadida.");

        } catch (error) {
            toast.error("Error al crear la categoría.");
        }
    };

    return (
        <div className="w-full flex flex-col gap-10">

            {/* CABECERA: */}
            <div className="w-full flex flex-col gap-8">
                <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                    <h2 className="dark:text-[var(--gris3)]">Categorías</h2>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-6">

                <div className="w-full flex mobile:flex-col tablet:flex-row justify-end items-center mobile:gap-4 tablet:gap-8 px-4">

                    {editando && (
                        <div className="w-full flex-1 rounded-xl border border-2 border-[var(--gris2)]">
                            <Input
                                id="nueva"
                                tipo="text"
                                value={nuevoNombre}
                                placeholder="Nombre de la nueva categoría"
                                required
                                onChange={(e) => setNuevoNombre(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="flex flex-row justify-end items-center gap-4">
                        {editando && (
                            <Boton
                                texto="Cancelar"
                                tamano="pequeno"
                                jerarquia="secundario"
                                onClick={() => setEditando(false)}
                            />
                        )}

                        <Boton
                            texto={editando ? "Guardar" : "Nueva Categoría"}
                            tamano="pequeno"
                            jerarquia="primario"
                            icon={editando ? "" : "/iconos/iconos-menu/icono-nuevo.svg"}
                            onClick={editando ? handleCrearCategoria : () => setEditando(true)}
                        />
                    </div>

                </div>

                <ListaCategorias key={refrescar.toString()} />

            </div>

        </div>
    );
}
