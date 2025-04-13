"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/inputs/Input";
import BotonSubmit from "@/components/buttons/BotonSubmit";

interface ComentarioFormProps {
    slug: string | null;
    usernameRespondiendoA?: string | null;
}

export default function ComentarioForm({ slug, usernameRespondiendoA }: ComentarioFormProps) {

    const router = useRouter();

    const [texto, setTexto] = useState('');
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);

    // Añadir al textarea el nombre de usuario al que se está respondiendo:
    useEffect(() => {
        if (usernameRespondiendoA !== null) {
            setTexto(`@${usernameRespondiendoA} `);
        }
    }, [usernameRespondiendoA]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);
        setError('');
        setExito(false);

        try {
            const res = await fetch(`/api/shares/${slug}/comentarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Error al publicar el comentario.');
            } else {
                usernameRespondiendoA = null;
                setTexto('');
                setExito(true);
                setTimeout(() => setExito(false), 3000);
                router.refresh();
            }
        } catch (err) {
            setError('Error de conexión.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">

            <h2>Comenta este Share</h2>

            <Input
                tipo="textarea"
                id="comentario"
                placeholder="Recuerda comentar con respeto."
                rows={4}
                value={texto}
                required={true}
                onChange={(e) => setTexto(e.target.value)}
            />

            <div className="flex justify-end gap-8 items-center">
                {exito && <p className="text-sm text-green-600">¡Publicado!</p>}
                {error && <p className="text-sm text-red-500">{error}</p>}

                <BotonSubmit
                    texto={cargando ? 'Publicando...' : 'Publicar'}
                    disabled={cargando || texto.trim() === ''}
                />
            </div>
        </form>
    );
}
