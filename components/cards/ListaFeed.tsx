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
    filtroCategoria: string;
    filtroUsuarios: "seguidos" | "todos";
    filtroVerificados: "verificados" | "todos";
}

const getExcerpt = (text: string, maxLength = 90) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function ListaFeed({ filtroCategoria, filtroUsuarios, filtroVerificados }: ListaFeedProps) {

    const [shares, setShares] = useState<ShareData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    useEffect(() => {
        const fetchShares = async () => {
            setLoading(true);
            setError(null);

            try {
                let url = "/api/shares"; // URL base de la API de shares

                // Si hay un término de búsqueda, filtramos por él
                if (query) {
                    url = `/api/shares?query=${encodeURIComponent(query)}`;
                }

                // Si estamos filtrando por "Usuarios que sigo", utilizamos la API específica
                if (filtroUsuarios === "seguidos") {
                    url = "/api/users/me/usuarios-siguiendo";
                }

                // Si estamos filtrando por "Contenido verificado", añadimos el filtro a la URL
                if (filtroVerificados === "verificados") {
                    url += url.includes("?") ? "&" : "?";
                    url += "verificados=true";
                }

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
    }, [query, filtroUsuarios, filtroVerificados]);

    // Si estamos filtrando por "Categoría", aplicamos el filtro
    const sharesFiltrados = filtroCategoria === 'todas'
        ? shares
        : shares.filter((share) => {
            const idsCategoriasDelShare = share.categorias.map((sc) => sc.categoria.id);
            return idsCategoriasDelShare.includes(filtroCategoria);
        });

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
            {sharesFiltrados.length === 0 ? (
                <div className="rounded-xl bg-red-200 p-4 my-16">
                    <p className="text-[var(--gris3)] text-center">🙁 No se han encontrado Shares relacionados con tu búsqueda.</p>
                </div>
            ) : (
                sharesFiltrados.map((share) => (
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
