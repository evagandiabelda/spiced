"use client";

import { useState } from "react";
import Input from "@/components/inputs/Input";
import InputFile from "@/components/inputs/InputFile";
import BotonSubmit from "@/components/buttons/BotonSubmit";
import Boton from "@/components/buttons/Boton";

export default function nuevoShareForm() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        titulo: "",
        texto: "",
        imgPrincipal: "",
        imgSecundaria: "",
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const fieldName = event.target.id; // Obtener el ID del input

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Error subiendo la imagen");

            const data = await response.json();
            setFormData((prev) => ({
                ...prev,
                [fieldName]: data.url, // Ahora se asigna correctamente a 'img_principal' o 'img_secundaria'
            }));
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!formData.imgPrincipal) {
            setError("Por favor, introduce una imagen válida.");
            return;
        }

        try {
            const response = await fetch("/api/shares", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Error al crear el Share");

            window.location.href = "/panel-estandar/tus-shares";
        } catch (error) {
            setError("Hubo un problema al publicar el Share");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-12">

            <div className="w-full flex mobile:flex-col laptop:flex-row gap-16">

                {/* COLUMNA IZQUIERDA */}

                <div className="mobile:w-full laptop:w-1/3 flex flex-col justify-end gap-12">

                    <div className="flex flex-col gap-4">
                        <label className="mb-3 block">Imagen principal</label>
                        <InputFile
                            id="imgPrincipal"
                            required
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <label className="mb-3 block">Imagen secundaria (opcional)</label>
                        <InputFile
                            id="imgSecundaria"
                            required={false}
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                </div>

                {/* COLUMNA DERECHA */}

                <div className="mobile:w-full laptop:max-w-full flex flex-col gap-12">

                    <div>
                        <label className="mb-3 block">Título</label>
                        <Input
                            tipo="text"
                            id="titulo"
                            placeholder="Añade un título a tu Share..."
                            value={formData.titulo}
                            required
                            onChange={(e) => setFormData((prev) => ({ ...prev, titulo: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className="mb-3 block">Texto</label>
                        <Input
                            tipo="textarea"
                            id="texto"
                            value={formData.texto}
                            rows={12}
                            required
                            onChange={(e) => setFormData((prev) => ({ ...prev, texto: e.target.value }))}
                        />
                    </div>

                </div>

            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-end gap-6">
                <Boton texto="Cancelar" enlace="/panel-estandar" tamano="grande" jerarquia="secundario" />
                <BotonSubmit texto="Publicar Share" disabled={loading} />
            </div>
        </form>
    );
}
