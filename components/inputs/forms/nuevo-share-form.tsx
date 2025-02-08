"use client";

import { useState } from "react";
import Input from "@/components/inputs/Input";
import BotonSubmit from "@/components/buttons/BotonSubmit";
import Boton from "@/components/buttons/Boton";
import Link from "next/link";
import { getUnsplashImageUrl } from "@/utils/unsplash";

export default function nuevoShareForm() {

    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [imgPrincipal, setImgPrincipal] = useState("");
    const [imgSecundaria, setImgSecundaria] = useState("");

    const [imageUrl, setImageUrl] = useState(""); // Última imagen obtenida
    const [userInputUrl, setUserInputUrl] = useState(""); // URL escrita por el usuario

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleImageUrlChange = (campo: "imgPrincipal" | "imgSecundaria") =>
        async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const url = event.target.value;
            setUserInputUrl(url); // Guardamos la URL ingresada por el usuario
            setError("");

            if (campo === "imgPrincipal") {
                setImgPrincipal(url);
            } else {
                setImgSecundaria(url);
            }

            if (url.includes("unsplash.com")) {
                setLoading(true);

                try {
                    const imageUrl = await getUnsplashImageUrl(url);
                    setLoading(false);

                    if (imageUrl) {
                        setImageUrl(imageUrl); // Guardamos la imagen obtenida
                        if (campo === "imgPrincipal") {
                            setImgPrincipal(imageUrl);
                        } else {
                            setImgSecundaria(imageUrl);
                        }
                    } else {
                        setError("No se pudo obtener la imagen. Asegúrate de copiar un enlace válido.");
                    }
                } catch (error) {
                    setLoading(false);
                    setError("Error al obtener la imagen.");
                }
            } else {
                setImageUrl(url);
            }
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!imgPrincipal) {
            setError("Por favor, introduce una imagen válida.");
            return;
        }

        try {
            const response = await fetch("/api/shares", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titulo, texto, imgPrincipal, imgSecundaria }),
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
            <div>
                <label className="mb-3 mt-5 block">Título</label>
                <Input tipo="text" id="titulo" placeholder="Añade un título a tu Share..." value={titulo} required onChange={(e) => setTitulo(e.target.value)} />

                <label className="mb-3 mt-5 block">Texto</label>
                <Input tipo="textarea" id="texto" value={texto} required onChange={(e) => setTexto(e.target.value)} />

                <div>
                    <label className="mb-3 mt-5 block">Imagen principal</label>
                    <span className="opacity-50">
                        Busca aquí tu imagen:{" "}
                        <Link href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Unsplash.com
                        </Link>
                    </span>
                    <Input tipo="text" id="imgPrincipal" placeholder="www.unsplash.com/tu-imagen-principal" value={userInputUrl} required onChange={handleImageUrlChange("imgPrincipal")} />
                </div>

                <div>
                    <label className="mb-3 mt-5 block">Imagen secundaria (opcional)</label>
                    <span className="opacity-50">
                        Busca aquí tu imagen:{" "}
                        <Link href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Unsplash.com
                        </Link>
                    </span>
                    <Input tipo="text" id="imgSecundaria" placeholder="www.unsplash.com/tu-imagen-secundaria" value={imgSecundaria} required={false} onChange={handleImageUrlChange("imgSecundaria")} />
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
