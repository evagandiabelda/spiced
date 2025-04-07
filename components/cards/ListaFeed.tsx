"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Masonry from "react-masonry-css";
import Share from "@/components/cards/Share";
import ShareSkeleton from "@/components/cards/ShareSkeleton";

interface ShareData {
    id: string;
    img_principal: string;
    categorias: {
        categoria: {
            nombre: string;
        };
    }[];
    spices: {
        spice: {
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
    filtroUsuarios: "seguidos" | "todos";
}

// Función para generar un extracto del texto (máx. 120 caracteres)
const getExcerpt = (text: string, maxLength = 120) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function ListaFeed({ filtroUsuarios }: ListaFeedProps) {
    const [shares, setShares] = useState<ShareData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";  // Obtener la query desde la URL

    useEffect(() => {
        const fetchShares = async () => {
            setLoading(true);
            setError(null);

            try {

                let url = "/api/shares";

                // Si se filtra por parámetros de búsqueda, se añade a la URL:
                if (query) {
                    url += `?query=${encodeURIComponent(query)}`
                }

                // Si se filtra por usuarios seguidos, se añade la lógica:
                if (filtroUsuarios === "seguidos") {
                    url = "/api/users/me/usuarios-siguiendo";
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
    }, [query]);  // Se ejecuta cada vez que cambia la query

    if (error) return <p className="text-red-500">{error}</p>;

    if (loading)
        return (
            <div className="w-full flex flex-wrap justify-center gap-8">
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
                <ShareSkeleton />
            </div>
        );

    return (
        <Masonry
            breakpointCols={{
                default: 4, // 4 columnas en pantallas grandes
                1024: 3, // 3 columnas en tablets
                768: 2, // 2 columnas en móviles grandes
                500: 1, // 1 columna en móviles pequeños
            }}
            className="w-full flex gap-6"
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
