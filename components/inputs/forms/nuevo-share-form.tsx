"use client";

import { useState } from "react";
import Input from "@/components/inputs/Input";
import InputFile from "@/components/inputs/InputFile";
import Image from "next/image";
import BotonSubmit from "@/components/buttons/BotonSubmit";
import Boton from "@/components/buttons/Boton";

export default function nuevoShareForm() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        titulo: "Título",
        texto: "Empieza a escribir para ver aquí el contenido de tu Share.",
        imgPrincipal: "/imgs/blank-image.jpg",
        imgSecundaria: "/imgs/blank-image.jpg",
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
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-12 px-8">

            <div className="w-full flex mobile:flex-col-reverse laptop:flex-row items-start gap-[3em]">

                {/* PREVISUALIZACIÓN */}

                <div className="mobile:w-full laptop:w-1/3 flex flex-col gap-4 rounded-xl bg-white/40 dark:bg-[var(--gris4)] p-6">
                    <div className="rounded-[0.4rem] overflow-hidden">
                        <Image
                            src={formData.imgPrincipal}
                            width={500}
                            height={300}
                            className="dark:opacity-30"
                            alt="imagen principal"
                        />
                    </div>
                    <div className="flex flex-col gap-6 py-4">
                        <h3 className="text-[1.2rem] text-[var(--gris2)]">{formData.titulo}</h3>
                        <p className="text-[0.8rem] text-[var(--gris2)]">{formData.texto}</p>
                    </div>
                    <div className="rounded-[0.4rem] overflow-hidden w-content">
                        <Image
                            src={formData.imgSecundaria}
                            width={100}
                            height={100}
                            className="dark:opacity-30 rounded-[0.4rem] overflow-hidden"
                            alt="imagen principal"
                        />
                    </div>
                </div>

                {/* EDITOR */}

                <div className="mobile:full laptop:w-2/3 flex flex-col gap-8">

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
                            rows={14}
                            required
                            onChange={(e) => setFormData((prev) => ({ ...prev, texto: e.target.value }))}
                        />
                    </div>

                    {/* CARGA DE IMÁGENES */}

                    <div className="w-full">
                        <label className="mb-3 block">Imagen principal</label>
                        <InputFile
                            id="imgPrincipal"
                            required
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>

                    <div className="w-full">
                        <label className="mb-3 block">Imagen secundaria (opcional)</label>
                        <InputFile
                            id="imgSecundaria"
                            required={false}
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>

                </div>

            </div>

            <div className="w-full flex flex-col gap-16">

                {/* BOTONES: */}

                {error && <p className="text-red-500">{error}</p>}

                <div className="flex justify-end gap-6">
                    <Boton texto="Cancelar" enlace="/panel-estandar" tamano="grande" jerarquia="secundario" />
                    <BotonSubmit texto="Publicar Share" disabled={loading} />
                </div>
            </div>

        </form>
    );
}
