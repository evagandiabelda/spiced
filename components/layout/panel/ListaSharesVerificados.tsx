"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ListaSkeleton from "@/components/layout/panel/ListaSkeleton";
import ItemListaShareVerificado from "./ItemListaShareVerificado";

interface Share {
    id: string;
    titulo: string;
    texto: string;
    img_principal: string;
    created_at: Date;
    slug: string;
    autor: {
        name: string;
    }
}

export default function ListaSharesVerificados() {
    const { data: session } = useSession();

    const [shares, setShares] = useState<Share[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSharesByUser = async () => {
            if (!session?.user?.name) return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/users/me/shares/verificados`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Error al recuperar los datos.");
                }

                const data = await response.json();
                const shares: Share[] = data.shares;

                if (shares.length === 0) {
                    setShares([]);
                } else {
                    setShares(shares);
                }
            } catch (error) {
                setError("Error cargando tus verificaciones.");
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
                <p className="text-sm text-[var(--gris3)] pt-4">
                    {session.user.usuario_verificado
                        ? "Todavía no has verificado ningún Share."
                        : "La verificación de tu cuenta de Experto está en proceso. Muy pronto podrás verificar Shares de otros usuarios."}
                </p>
            ) : (
                <ul>
                    {shares.map((share) => (
                        <ItemListaShareVerificado
                            id={share.id}
                            key={share.id}
                            imagen={share.img_principal}
                            user={share.autor.name}
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
