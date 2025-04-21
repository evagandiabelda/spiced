"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ListaSkeleton from "@/components/panel/ListaSkeleton";
import ItemListaShareGuardado from "@/components/panel/ItemListaShareGuardado";

interface Share {
    id: string;
    titulo: string;
    texto: string;
    img_principal: string;
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

            console.log("Estoy aquí");

            try {
                const response = await fetch(`/api/users/me/shares/guardados`);
                if (!response.ok) {
                    throw new Error("Error al recuperar los datos.");
                }

                const data = await response.json();
                const shares: Share[] = data.map((shareGuardado: any) => shareGuardado.share);

                if (shares.length === 0) {
                    setError("Todavía no has guardado ningún share.");
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

    if (!session?.user) return <p>Debes iniciar sesión para ver tus shares.</p>;
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
                <p>Todavía no hay shares por aquí...</p>
            ) : (
                <ul>
                    {shares.map((share) => (
                        <ItemListaShareGuardado
                            id={share.id}
                            key={share.id}
                            imagen={share.img_principal}
                            user={session.user!.name} // Aquí usamos "!" porque ya verificamos antes que está definido
                            titulo={share.titulo}
                            fecha={share.created_at as Date}
                            slug={share.slug}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
