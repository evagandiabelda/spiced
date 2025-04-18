"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
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

interface ListaFeedUsuarioProps {
    idAutor: string;
    nameAutor: string;
}

const getExcerpt = (text: string, maxLength = 90) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function ListaFeedUsuario({ idAutor, nameAutor }: ListaFeedUsuarioProps) {

    const [shares, setShares] = useState<ShareData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchShares = async () => {
            setLoading(true);
            setError(null);

            if (!idAutor || !nameAutor) return;

            try {

                const params = new URLSearchParams();

                if (idAutor) {
                    params.set('autor', idAutor);
                }

                const res = await fetch(`/api/users/${nameAutor}/shares?autor=${idAutor}`);
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
    }, [idAutor, nameAutor]);



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
        <div>
            {shares.length === 0 &&
                <div className="w-full flex flex-col items-center">
                    <p className="w-full text-[var(--gris3)] text-center">Todavía no hay Shares publicados.</p>
                </div>}
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
                {shares.map((share) => (

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
                ))}
            </Masonry>
        </div>



    );
}
