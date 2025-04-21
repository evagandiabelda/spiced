"use client";

/* SOLO PARA EL PANEL DE ADMIN */

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ListaSkeleton from "@/components/panel/ListaSkeleton";
import ItemListaShares from "@/components/panel/ItemListaShares";
import Boton from "@/components/buttons/Boton";
import { DenunciaShare } from "@prisma/client";

type ShareData = {
    id: string;
    titulo: string;
    texto: string;
    img_principal: string;
    created_at: Date;
    slug: string;
    share_verificado: boolean;
    autor: {
        name: string;
        usuario_verificado: boolean;
    };
    denuncias: DenunciaShare[];
}

interface ListaSharesProps {
    numItems?: number;
}

export default function ListaShares({ numItems }: ListaSharesProps) {
    const { data: session } = useSession();
    const [shares, setShares] = useState<ShareData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(numItems || 10);

    useEffect(() => {
        const fetchShares = async () => {
            if (session?.user?.userType !== "admin") return; // Evitar la llamada si no es Admin

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/shares`);
                if (!response.ok) {
                    throw new Error("Error al recuperar los Shares.");
                }

                const data = await response.json();
                const shares: ShareData[] = data.shares;

                if (shares.length === 0) {
                    setError("Todavía no se ha registrado ningún Share.");
                    setShares([]);
                } else {

                    // Ordenar los Shares por número de denuncias antes de guardar:
                    const sharesOrdenados = shares.sort((a, b) => b.denuncias.length - a.denuncias.length);

                    // Si no se ha especificado por prop, se establece el número de Shares a mostrar en base a los Shares existentes:
                    if (!numItems) {
                        numItems = sharesOrdenados.length;
                    }

                    // Se guardan los Shares en el estado:
                    setShares(sharesOrdenados);

                }
            } catch (error) {
                setError("Error cargando los Shares.");
            } finally {
                setLoading(false);
            }
        };

        fetchShares();
    }, [session]); // Se ejecuta solo cuando el usuario cambia

    const handleDelete = async (slug: string) => {

        if (session?.user?.userType !== "admin") return;

        try {

            const share = shares.find((share) => share.slug === slug);

            if (!share) {
                alert("share no encontrado.");
                return;
            }

            const res = await fetch(`/api/shares/${share.slug}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Error al eliminar el share.");
            }

            setShares((prevshares) => prevshares.filter((share) => share.slug !== slug));

        } catch (error) {
            console.error(error);
            alert("Hubo un error al eliminar el share.");
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
        <div className="w-full flex flex-col gap-8 px-4 pt-[10px] pb-[24px] rounded-xl bg-white dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--gris4)]">
            {shares.length === 0 ? (
                <p>Todavía no hay shares por aquí...</p>
            ) : (
                <ul>
                    {shares.slice(0, visibleCount).map((share) => (
                        <ItemListaShares
                            key={share.id}
                            id={share.id}
                            titulo={share.titulo}
                            texto={share.texto}
                            imagen={share.img_principal}
                            fecha={share.created_at as Date}
                            slug={share.slug}
                            share_verificado={share.share_verificado}
                            user={share.autor}
                            numDenuncias={share.denuncias.length}
                            onDelete={() => handleDelete(share.slug)}
                        />
                    ))}
                </ul>
            )}

            <div className="w-full flex justify-center items-center gap-4 p-8">
                <Boton
                    texto="Ver más shares"
                    tamano="grande"
                    jerarquia="primario"
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                />
            </div>
        </div>
    );
}
