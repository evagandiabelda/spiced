"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ListaSkeleton from "@/components/layout/panel/ListaSkeleton";
import { DenunciaShare } from "@prisma/client";
import ItemListaDenuncias from "@/components/layout/panel/ItemListaDenuncias";

type DenunciaData = DenunciaShare & {
    share: {
        id: string;
        titulo: string;
        img_principal: string;
        slug: string;
        autor: {
            id: string;
            name: string;
        }
    }
    user: {
        id: string;
        name: string;
        foto: string;
        usuario_verificado: boolean;
    }
}

interface ListaDenunciasProps {
    numItems?: number;
}

export default function ListaDenuncias({ numItems }: ListaDenunciasProps) {
    const { data: session } = useSession();
    const [denuncias, setDenuncias] = useState<DenunciaData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDenuncias = async () => {
            if (!session?.user?.name) return; // Evitar la llamada si no hay usuario autenticado

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/denuncias/shares`);
                if (!response.ok) {
                    throw new Error("Error al recuperar las denuncias.");
                }

                const data = await response.json();
                const denuncias: DenunciaData[] = data.denuncias;

                if (denuncias.length === 0) {
                    setError("Todavía no se ha registrado ninguna denuncia.");
                    setDenuncias([]);
                } else {
                    if (!numItems) {
                        numItems = denuncias.length;
                    }
                    setDenuncias(denuncias);
                }
            } catch (error) {
                setError("Error cargando las denuncias.");
            } finally {
                setLoading(false);
            }
        };

        fetchDenuncias();
    }, [session?.user?.name]); // Se ejecuta solo cuando el usuario cambia

    if (!session?.user) return <p>Debes iniciar sesión para ver las denuncias.</p>;
    if (error) return <p>{error}</p>;

    if (loading) return (
        <div className="w-full flex flex-col gap-8 p-[30px] rounded-xl bg-white dark:bg-[var(--gris4)]">
            <ListaSkeleton />
            <ListaSkeleton />
            <ListaSkeleton />
        </div>
    );

    return (
        <div className="w-full flex flex-col gap-8 p-[10px] pb-[24px] rounded-xl bg-white dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--borde-shares)]">
            {denuncias.length === 0 ? (
                <p>Todavía no hay shares por aquí...</p>
            ) : (
                <ul>
                    {denuncias.slice(0, numItems).map((denuncia) => (
                        <ItemListaDenuncias
                            key={denuncia.id}
                            motivo={denuncia.motivo}
                            fecha={denuncia.created_at as Date}
                            share={denuncia.share}
                            user={denuncia.user}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
