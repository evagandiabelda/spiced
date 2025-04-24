"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import ListaSkeleton from "@/components/panel/ListaSkeleton";
import ItemListaShareGuardado from "@/components/panel/ItemListaShareGuardado";

interface Share {
    id: string;
    titulo: string;
    texto: string;
    img_principal: string;
    autor: {
        id: string;
        name: string;
    };
    created_at: Date;
    slug: string;
}

export default function ListaSharesGuardados() {
    const { data: session } = useSession();
    const [shares, setShares] = useState<Share[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSharesByUser = async () => {
            if (!session?.user?.name) return; // Evitar la llamada si no hay usuario autenticado

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/users/me/shares/guardados`);
                if (!response.ok) {
                    throw new Error("Error al recuperar los datos.");
                }

                const data = await response.json();
                const shares: Share[] = data.map((shareGuardado: any) => shareGuardado.share);

                if (shares.length === 0) {
                    setShares([]);
                } else {
                    setShares(shares);
                }
            } catch (error) {
                setError("Error cargando los shares.");
            } finally {
                setLoading(false);
            }
        };

        fetchSharesByUser();
    }, [session?.user?.name]); // Se ejecuta solo cuando el usuario cambia

    const handleDesguardar = async (id: string) => {
        toast.loading("Borrando...");

        try {
            const res = await fetch(`/api/users/me/shares/guardados`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ share_id: id }),
            })

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Error al borrar el Share de la lista de Guardados.');
            }

            toast.remove();
            setShares((prevShares) => prevShares.filter((share) => share.id !== id));
            toast.success("Share borrado de la lista de Guardados.");
        } catch (error: any) {
            toast.remove();
            toast.error("Error al borrar el Share de la lista de Guardados.");
        }
    }

    if (!session?.user) return;
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
            {shares.length === 0 ? (
                <p className="text-sm text-[var(--gris3)] pt-4">Todavía no hay shares por aquí...</p>
            ) : (
                <ul>
                    {shares.map((share) => (
                        <ItemListaShareGuardado
                            key={share.id}
                            id={share.id}
                            imagen={share.img_principal}
                            autor={share.autor.name} // Aquí usamos "!" porque ya verificamos antes que está definido
                            titulo={share.titulo}
                            fecha={share.created_at as Date}
                            slug={share.slug}
                            onDelete={() => handleDesguardar(share.id)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
