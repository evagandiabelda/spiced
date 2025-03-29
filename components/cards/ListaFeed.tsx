"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Masonry from "react-masonry-css";
import Share from "@/components/cards/Share";
import ShareSkeleton from "@/components/cards/ShareSkeleton";

interface ShareData {
    id: string;
    img_principal: string;
    user: {
        name: string;
        foto: string;
    } | null;
    titulo: string;
    texto: string;
    slug: string;
}

// Función para generar un extracto del texto (máx. 120 caracteres)
const getExcerpt = (text: string, maxLength = 120) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function ListaFeed() {
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
                        user={share.user?.name || "anónimo"}
                        foto={share.user?.foto || "/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"}
                        titulo={share.titulo}
                        extracto={getExcerpt(share.texto)}
                        onClick={() => router.push(`/share/${share.slug}`)}
                    />
                ))
            )}
        </Masonry>
    );
}
