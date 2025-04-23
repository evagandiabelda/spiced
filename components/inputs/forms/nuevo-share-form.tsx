"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast"
import Input from "@/components/inputs/Input";
import Options from "@/components/inputs/Options";
import NubeTagsDinamica from "@/components/buttons/NubeTagsDinamica";
import Tag from "@/components/buttons/Tag";
import Image from "next/image";
import BotonSubmit from "@/components/buttons/BotonSubmit";
import Boton from "@/components/buttons/Boton";

type Categoria = {
    id: string;
    nombre: string;
}

export default function nuevoShareForm() {

    const { data: session } = useSession();

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [formData, setFormData] = useState({
        titulo: "",
        texto: "",
        categoria: "",
        spices: [] as string[],
        imgPrincipal: "",
        imgSecundaria: "",
    });

    let windowLocationReloadHref = "#"

    if (session?.user.userType === "expert") {
        windowLocationReloadHref = "/panel-experto/tus-shares";
    }
    else if (session?.user.userType === "standard") {
        windowLocationReloadHref = "/panel-estandar/tus-shares";
    }

    useEffect(() => {
        const fetchCategorias = async () => {

            try {
                const res = await fetch('/api/categorias');
                if (!res.ok) throw new Error('Error al obtener categorías.');
                const data = await res.json();

                const categorias: Categoria[] = data.categorias;

                if (categorias.length === 0) {
                    setCategorias([]);
                } else {
                    setCategorias(categorias);
                }
            } catch (error) {
                console.error('Error al cargar las categorías.', error);
            }
        };

        fetchCategorias();
    }, []);

    const opcionesCategoria = categorias.map((cat) => ({
        id: cat.nombre, // Para que construya la URL en base al nombre y no a un ID.
        nombre: cat.nombre
    }));

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        toast.loading("Cargando la imagen...");

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

            toast.remove();
            toast.success("¡Imagen cargada!");
        } catch (error) {
            toast.error("Error al subir la imagen.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        toast.loading("Publicando...")

        if (!formData.categoria) {
            toast.remove();
            toast.error("Por favor, selecciona una Categoría.")
            return;
        }

        if (formData.spices.length === 0) {
            toast.remove();
            toast.error("Por favor, selecciona al menos un Spice.");
            return;
        }

        if (!formData.imgPrincipal) {
            toast.remove();
            toast.error("Por favor, introduce una imagen válida.");
            return;
        }

        try {
            const response = await fetch("/api/shares", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData, // Resto de datos.
                    categorias: [formData.categoria], // Categorías
                    // Se transforman de 'string' a 'array' porque el backend está preparado para recibir varias.
                }),
            });

            if (!response.ok) throw new Error("Error al crear el Share");

            toast.remove();
            toast.success("¡Share publicado!");
            window.location.href = windowLocationReloadHref;

        } catch (error) {
            toast.error("Hubo un problema al publicar el Share");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-12">

            <div className="w-full flex mobile:flex-col-reverse laptop:flex-row items-start gap-[3em]">

                {/* PREVISUALIZACIÓN */}

                <div className="mobile:w-full laptop:w-1/3 flex flex-col gap-8">

                    <h3 className="w-full px-2 pb-4 text-[var(--gris2)] border-b border-b-1 border-b-[var(--gris2)]">Vista previa</h3>

                    <div className="w-full flex flex-col gap-4 rounded-xl bg-white/40 dark:bg-[var(--gris4)] p-6">

                        {/* CARGA DE IMAGEN PRINCIPAL */}
                        <div className="rounded-[0.4rem] overflow-hidden">
                            <input
                                type="file"
                                id="imgPrincipal"
                                name="imgPrincipal"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                                required
                            />
                            <label htmlFor="imgPrincipal" className='opacity-100 cursor-pointer'>
                                <Image
                                    src={formData.imgPrincipal || "/imgs/blank-image.jpg"}
                                    width={500}
                                    height={300}
                                    className="hover:scale-[1.05] cursor-pointer transition ease dark:opacity-30"
                                    alt="imagen principal"
                                />
                            </label>
                        </div>

                        <div className="flex flex-col gap-2 py-4">

                            <h3 className="text-[1.2rem] text-[var(--gris2)]">{formData.titulo}</h3>

                            <span className="text-[0.8rem] text-[var(--gris2)]">{formData.categoria}</span>

                            <div className="w-full flex flex-wrap gap-2 py-2">
                                {formData.spices.map((spice, index) => (
                                    <Tag
                                        key={index}
                                        nombre={spice}
                                        tamano="pequeno"
                                        mode="static"
                                    />
                                ))}
                            </div>

                            <div className="w-full py-6 border-t border-t-1 border-t-[var(--gris2)]">
                                <p className="text-[0.9rem] text-[var(--gris2)]">{formData.texto}</p>
                            </div>

                        </div>

                        {/* CARGA DE IMAGEN SECUNDARIA */}
                        <div className="rounded-[0.4rem] overflow-hidden w-content">
                            <input
                                type="file"
                                id="imgSecundaria"
                                name="imgSecundaria"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="imgSecundaria" className='opacity-100 cursor-pointer'>
                                <Image
                                    src={formData.imgSecundaria || "/imgs/blank-image.jpg"}
                                    width={100}
                                    height={100}
                                    className="hover:scale-[1.05] cursor-pointer transition ease dark:opacity-30 rounded-[0.4rem] overflow-hidden"
                                    alt="imagen principal"
                                />
                            </label>

                        </div>

                    </div>

                </div>

                {/* EDITOR */}

                <div className="mobile:full laptop:w-2/3 flex flex-col gap-8">

                    <h3 className="w-full px-2 pb-4 border-b border-b-1 border-b-[var(--gris2)]">Editor</h3>

                    <div>
                        <Input
                            tipo="text"
                            id="titulo"
                            placeholder="Escribe un título personalizado"
                            value={formData.titulo}
                            required
                            onChange={(e) => setFormData((prev) => ({ ...prev, titulo: e.target.value }))}
                        />
                    </div>

                    <div className="w-full">
                        <Options
                            tipo="dropdown"
                            name="categoria"
                            placeholder="Elige una categoría"
                            opciones={opcionesCategoria}
                            valorSeleccionado={formData.categoria}
                            onChange={(nuevoValor) =>
                                setFormData((prev) => ({ ...prev, categoria: nuevoValor as string }))
                            }
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label className="mb-3 block text-center">¿A qué Spices va dirigido?</label>
                        <div className="w-full scale-[0.9]">
                            <NubeTagsDinamica
                                uso="register"
                                tagsSeleccionados={formData.spices}
                                onSeleccionarTags={(tags) =>
                                    setFormData((prev) => ({ ...prev, spices: tags }))
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <Input
                            tipo="textarea"
                            id="texto"
                            placeholder="Escribe aquí lo que quieras: reflexiones, consejos, preguntas a la comunidad..."
                            value={formData.texto}
                            rows={14}
                            required
                            onChange={(e) => setFormData((prev) => ({ ...prev, texto: e.target.value }))}
                        />
                    </div>

                </div>

            </div>

            <div className="w-full flex flex-col gap-16">

                {/* BOTONES: */}

                <div className="flex justify-end gap-6">
                    <Boton texto="Cancelar" enlace="/panel-estandar" tamano="grande" jerarquia="secundario" />
                    <BotonSubmit texto="Publicar Share" />
                </div>
            </div>

        </form>
    );
}
