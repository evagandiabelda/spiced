"use client";

import { useState } from "react";
import Input from "@/components/inputs/Input";
import BotonSubmit from "@/components/buttons/BotonSubmit";

interface ComentarioFormProps {
    slug: string | null;
}

export default function ComentarioForm({ slug }: ComentarioFormProps) {

    const [texto, setTexto] = useState('');
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);

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
                setTexto('');
                setExito(true);
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
