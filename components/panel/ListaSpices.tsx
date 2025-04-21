"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ListaSkeleton from "@/components/panel/ListaSkeleton";
import ItemListaSpices from "@/components/panel/ItemListaSpices";

interface Spice {
    id: string;
    nombre: string;
}

export default function ListaSpices() {

    const { data: session } = useSession(); // Obtener sesión
    const [spices, setSpices] = useState<Spice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSpices = async () => {
            if (session?.user?.userType !== "admin") return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/spices`);
                if (!response.ok) {
                    throw new Error("Error al recuperar los datos.");
                }

                const data = await response.json();
                const spices: Spice[] = data.spices;

                if (spices.length === 0) {
                    setError("Todavía no has publicado ningún Spice.");
                    setSpices([]);
                } else {
                    setSpices(spices);
                }
            } catch (error) {
                setError("Error cargando los Spices.");
            } finally {
                setLoading(false);
            }
        };

        fetchSpices();
    }, [session]);

    const handleEdit = async (id: string, nombre: string) => {

        if (session?.user?.userType !== "admin") return;

        try {

            const res = await fetch(`/api/spices/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre }),
            });

            if (!res.ok) {
                throw new Error("Error al editar el Spice.");
            }

            setSpices((prevSpices) =>
                prevSpices.map((spice) =>
                    spice.id === id ? { ...spice, nombre } : spice
                )
            );

        } catch (error) {
            console.error(error);
            alert("Hubo un error al editar el Spice.");
        }

    };

    const handleDelete = async (id: string) => {

        if (session?.user?.userType !== "admin") return;

        try {

            const res = await fetch(`/api/spices/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Error al eliminar el Spice.");
            }

            setSpices((prevSpices) => prevSpices.filter((spice) => spice.id !== id));

        } catch (error) {
            console.error(error);
            alert("Hubo un error al eliminar el Spice.");
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
        <div className="w-full flex flex-col gap-8 px-6 pt-[10px] pb-[24px] rounded-xl bg-white dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--gris4)]">
            {spices.length === 0 ? (
                <p>Todavía no hay Spices.</p>
            ) : (
                <ul>
                    {spices.map((spice) => (
                        <ItemListaSpices
                            key={spice.id}
                            id={spice.id}
                            nombre={spice.nombre}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
