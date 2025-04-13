"use client";

import { useState } from "react";
import Input from "@/components/inputs/Input";
import Boton from "@/components/buttons/Boton";
import BotonSubmit from "@/components/buttons/BotonSubmit";

interface DenunciaFormProps {
    slug: string | null;
    idComentario?: string | null;
    onClose: () => void;
}

export default function DenunciaForm({ slug, idComentario, onClose }: DenunciaFormProps) {

    const [motivo, setMotivo] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const [exito, setExito] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);
        setError("");
        setExito(false);

        let ruta = "";

        if (idComentario) {
            ruta = `/api/shares/${slug}/comentarios/${idComentario}/denunciar-comentario`;
        } else {
            ruta = `/api/shares/${slug}/denunciar-share`;
        }

        try {
            const res = await fetch(ruta, {
                method: "POST",
                body: JSON.stringify({ motivo }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                setExito(true);
                setTimeout(() => {
                    onClose();
                }, 1500);
            } else {
                setError("Error al enviar la denuncia.");
            }
        } catch {
            setError("Error inesperado.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h3>Denunciar comentario</h3>
            <Input
                tipo="textarea"
                id="denuncia"
                placeholder="Escribe el motivo de tu denuncia."
                rows={2}
                value={motivo}
                required={true}
                onChange={(e) => setMotivo(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {exito && <p className="text-green-600 text-sm">Tu denuncia se ha registrado. Gracias por ayudar a mejorar Spiced.</p>}
            <div className="flex justify-end gap-2">
                <Boton
                    texto="Cancelar"
                    tamano="grande"
                    jerarquia="secundario"
                    onClick={onClose}
                />
                <BotonSubmit
                    texto={cargando ? "Enviando..." : "Enviar denuncia"}
                    disabled={cargando}
                />
            </div>
        </form>
    );
}
