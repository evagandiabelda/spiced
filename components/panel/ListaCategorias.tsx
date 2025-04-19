"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ListaSkeleton from "@/components/panel/ListaSkeleton";
import ItemListaCategorias from "@/components/panel/ItemListaCategorias";

interface Categoria {
    id: string;
    nombre: string;
}

export default function ListaCategorias() {

    const { data: session } = useSession(); // Obtener sesión
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            if (session?.user?.userType !== "admin") return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/categorias`);
                if (!response.ok) {
                    throw new Error("Error al recuperar los datos.");
                }

                const data = await response.json();
                const categorias: Categoria[] = data.categorias;

                if (categorias.length === 0) {
                    setError("Todavía no has publicado ninguna categoría.");
                    setCategorias([]);
                } else {
                    setCategorias(categorias);
                }
            } catch (error) {
                setError("Error cargando las categorías.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategorias();
    }, [session]);

    const handleEdit = async (id: string, nombre: string) => {

        if (session?.user?.userType !== "admin") return;

        try {

            const res = await fetch(`/api/categorias/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre }),
            });

            if (!res.ok) {
                throw new Error("Error al editar la categoría.");
            }

            setCategorias((prevCategorias) =>
                prevCategorias.map((categoria) =>
                    categoria.id === id ? { ...categoria, nombre } : categoria
                )
            );

        } catch (error) {
            console.error(error);
            alert("Hubo un error al editar la categoría.");
        }

    };

    const handleDelete = async (id: string) => {

        if (session?.user?.userType !== "admin") return;

        try {

            const res = await fetch(`/api/categorias/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Error al eliminar la categoría.");
            }

            setCategorias((prevCategorias) => prevCategorias.filter((categoria) => categoria.id !== id));

        } catch (error) {
            console.error(error);
            alert("Hubo un error al eliminar la categoría.");
        }
    };

    if (error) return <p>{error}</p>;

    if (loading) return (
        <div className="w-full flex flex-col gap-8 p-[30px] rounded-xl bg-white dark:bg-[var(--gris4)]">
            <ListaSkeleton />
            <ListaSkeleton />
            <ListaSkeleton />
        </div>
    );

    return (
        <div className="w-full flex flex-col gap-8 px-[30px] pt-[10px] pb-[24px] rounded-xl bg-white dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--borde-shares)]">
            {categorias.length === 0 ? (
                <p>Todavía no hay categorías.</p>
            ) : (
                <ul>
                    {categorias.map((categoria) => (
                        <ItemListaCategorias
                            key={categoria.id}
                            id={categoria.id}
                            nombre={categoria.nombre}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
