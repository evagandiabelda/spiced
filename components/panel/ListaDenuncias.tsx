"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import ListaSkeleton from "@/components/panel/ListaSkeleton";
import ItemListaDenuncias from "@/components/panel/ItemListaDenuncias";

type DenunciaData = {
    id: string;
    motivo: string;
    created_at: Date;

    share?: {
        id: string;
        titulo: string;
        img_principal: string;
        slug: string;
        autor: { // Denunciado
            name: string;
        }
    };

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
    };

    user: { // Denunciante
        id: string;
        name: string;
        foto: string;
        usuario_verificado: boolean;
    };
}

interface ListaDenunciasProps {
    numItems?: number;
}

export default function ListaDenuncias({ numItems }: ListaDenunciasProps) {
    const { data: session } = useSession();
    const [denunciasShares, setDenunciasShares] = useState<DenunciaData[]>([]);
    const [denunciasComentarios, setDenunciasComentarios] = useState<DenunciaData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDenunciasShares = async () => {
            if (session?.user.userType !== "admin") return; // Evitar la llamada si no es Admin

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
                    setDenunciasShares([]);
                } else {

                    if (!numItems) {
                        numItems = denuncias.length;
                    }

                    // Añadir tipo "share" a las denuncias de Shares
                    const denunciasConTipo = denuncias.map((denuncia) => ({
                        ...denuncia,
                        tipo: "share"  // Aquí asignamos el tipo
                    }));

                    setDenunciasShares(denuncias);
                }
            } catch (error) {
                setError("Error cargando las denuncias.");
            } finally {
                setLoading(false);
            }
        };

        const fetchDenunciasComentarios = async () => {
            if (session?.user.userType !== "admin") return; // Evitar la llamada si no es Admin

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/denuncias/comentarios`);
                if (!response.ok) {
                    throw new Error("Error al recuperar las denuncias.");
                }

                const data = await response.json();
                const denuncias: DenunciaData[] = data.denuncias;

                if (denuncias.length === 0) {
                    setDenunciasComentarios([]);
                } else {

                    if (!numItems) {
                        numItems = denuncias.length;
                    }

                    // Añadir tipo "comentario" a las denuncias de Comentarios
                    const denunciasConTipo = denuncias.map((denuncia) => ({
                        ...denuncia,
                        tipo: "comentario"  // Aquí asignamos el tipo
                    }));

                    setDenunciasComentarios(denuncias);
                }
            } catch (error) {
                setError("Error cargando las denuncias.");
            } finally {
                setLoading(false);
            }
        };

        fetchDenunciasShares();
        fetchDenunciasComentarios();

    }, [session]); // Se ejecuta solo cuando el usuario cambia

    const allDenuncias = [...denunciasShares, ...denunciasComentarios];

    const handleDeleteShare = async (id: string) => {

        if (session?.user?.userType !== "admin") return;

        try {

            const share = denunciasShares.find((share) => share.id === id);

            if (!share) {
                alert("Share no encontrado.");
                return;
            }

            const res = await fetch(`/api/shares/${share.share?.slug}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Error al eliminar el Share.");
            }

            setDenunciasShares((prevDenuncias) => prevDenuncias.filter((denuncia) => denuncia.id !== id));

            toast.success("Share eliminado.");

        } catch (error) {
            toast.error("Hubo un error al eliminar el Share.");
        }
    };

    const handleDeleteComentario = async (id: string) => {

        if (session?.user?.userType !== "admin") return;

        try {

            const comentario = denunciasComentarios.find((comentario) => comentario.id === id);

            if (!comentario) {
                alert("Comentario no encontrado.");
                return;
            }

            const res = await fetch(`/api/shares/${comentario.share?.slug}/comentarios/${comentario.id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Error al eliminar el comentario.");
            }

            setDenunciasComentarios((prevDenuncias) => prevDenuncias.filter((denuncia) => denuncia.id !== id));

            toast.success("Comentario eliminado.");

        } catch (error) {
            toast.error("Hubo un error al eliminar el comentario.");
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
        <div className="w-full flex flex-col gap-8 px-4 pb-[24px] rounded-xl bg-white dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--borde-denuncias)]">
            {allDenuncias.length === 0 ? (
                <p className="pt-6 px-4">Todavía no hay denuncias.</p>
            ) : (
                <ul>
                    {allDenuncias.slice(0, numItems).map((denuncia) => (
                        <ItemListaDenuncias
                            key={denuncia.id}
                            motivo={denuncia.motivo}
                            fecha={denuncia.created_at as Date}
                            share={denuncia.share}
                            comentario={denuncia.comentario}
                            user={denuncia.user}
                            onDeleteShare={handleDeleteShare}
                            onDeleteComentario={handleDeleteComentario}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
