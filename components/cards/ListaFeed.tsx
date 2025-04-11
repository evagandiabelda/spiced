"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Masonry from "react-masonry-css";
import Share from "@/components/cards/Share";
import ShareSkeleton from "@/components/cards/ShareSkeleton";

interface ShareData {
    id: string;
    img_principal: string;
    categorias: {
        categoria: {
            id: string,
            nombre: string;
        };
    }[];
    spices: {
        spice: {
            id: string;
            nombre: string;
        };
    }[];
    autor: {
        name: string;
        foto: string;
        usuario_verificado: boolean;
    } | null;
    titulo: string;
    texto: string;
    slug: string;
}

interface ListaFeedProps {
    filtroUsuarios?: "siguiendo" | "todos";
    filtroVerificados?: "verificados" | "todos";
    filtroCategoria: string;
    filtroSpices: string[];
}

const getExcerpt = (text: string, maxLength = 90) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function ListaFeed({ filtroCategoria, filtroUsuarios, filtroVerificados, filtroSpices }: ListaFeedProps) {

    const [shares, setShares] = useState<ShareData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    // PARA LA QUERY:

    useEffect(() => {
        const fetchShares = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = query ? `/api/shares?query=${encodeURIComponent(query)}` : "/api/shares";

                const res = await fetch(url);
                if (!res.ok) throw new Error("Error al obtener los shares");

                const data = await res.json();
                setShares(data.shares);
            } catch (err) {
                setError("No se pudieron cargar los shares.");
            } finally {
                setLoading(false);
            }
        };

        fetchShares();
    }, [query]);

    // PARA EL RESTO DE FILTROS:

    useEffect(() => {
        const fetchShares = async () => {
            setLoading(true);
            setError(null);

            try {

                let url = '';
                const params = new URLSearchParams();

                // Definir URL base según el filtro de usuarios
                if (filtroUsuarios === 'siguiendo') {
                    url = '/api/users/me/siguiendo';
                } else {
                    url = '/api/shares';
                }

                if (filtroVerificados == "verificados") {
                    params.set('verificados', String(filtroVerificados));
                }

                if (filtroSpices.length > 0) {
                    params.set('spices', filtroSpices.join(','));
                }

                if (filtroCategoria && filtroCategoria !== 'todas') {
                    params.set('categoria', filtroCategoria);
                }

                const res = await fetch(`${url}?${params.toString()}`);
                if (!res.ok) throw new Error("Error al obtener los shares");

                const data = await res.json();
                setShares(data.shares);
            } catch (err) {
                setError("No se pudieron cargar los shares.");
            } finally {
                setLoading(false);
            }
        };

        fetchShares();
    }, [filtroCategoria, filtroUsuarios, filtroVerificados, filtroSpices]);



    if (error) return <p className="text-red-500">{error}</p>;

    if (loading)
        return (
            <Masonry
                breakpointCols={{
                    default: 5, // Ordenadores grandes
                    1600: 4, // Ordenadores pequeños
                    1024: 3, // Tablets
                    768: 2, // Móviles grandes
                    500: 1, // Móviles pequeños
                }}
                className="w-full flex gap-5"
                columnClassName="masonry-column"
            >
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
            </Masonry>

        );

    return (
        <Masonry
            breakpointCols={{
                default: 5, // Ordenadores grandes
                1600: 4, // Ordenadores pequeños
                1024: 3, // Tablets
                768: 2, // Móviles grandes
                500: 1, // Móviles pequeños
            }}
            className="w-full flex gap-5"
            columnClassName="masonry-column"
        >
            {shares.length === 0 ? (
                <div className="rounded-xl bg-red-200 p-4 my-16">
                    <p className="text-[var(--gris3)] text-center">🙁 No se han encontrado Shares relacionados con tu búsqueda.</p>
                </div>
            ) : (
                shares.map((share) => (
                    <Share
                        key={share.id}
                        imagen={share.img_principal || "/imgs/IMG-Ejemplo-Miniatura.png"}
                        verificado={share.autor?.usuario_verificado || false}
                        user={share.autor?.name || "anónimo"}
                        foto={share.autor?.foto || "/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"}
                        categorias={share.categorias.map(c => c.categoria.nombre)}
                        spices={share.spices.map(s => s.spice.nombre)}
                        titulo={share.titulo}
                        extracto={getExcerpt(share.texto)}
                        onClick={() => router.push(`/share/${share.slug}`)}
                    />
                ))
            )}
        </Masonry>
    );
}
