"use client";


import { useEffect, useState } from "react";
import Share from "@/components/cards/Share";

interface ShareData {
    id: string;
    img_principal: string;
    user: {
        name: string;
        foto: string;
    } | null;
    titulo: string;
    texto: string;
}

// Función para generar un extracto del texto (máx. 120 caracteres)
const getExcerpt = (text: string, maxLength = 120) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function ListaShares() {

    const [shares, setShares] = useState<ShareData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchShares = async () => {
            try {
                const res = await fetch("/api/shares");
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
    }, []);

    if (loading) return <p className="opacity-50">Cargando...</p>
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="w-full flex flex-wrap justify-center gap-8">
            {shares.map((share) => (
                <Share
                    key={share.id}
                    imagen={share.img_principal || "/imgs/IMG-Ejemplo-Miniatura.png"}
                    user={share.user?.name || "anónimo"}
                    foto={share.user?.foto || "/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"}
                    titulo={share.titulo}
                    extracto={getExcerpt(share.texto)}
                />
            ))}
        </div>
    );

}