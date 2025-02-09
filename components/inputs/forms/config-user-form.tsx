"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Avatar from "@/components/icons/Avatar";
import Input from "@/components/inputs/Input";
import InputFile from "@/components/inputs/InputFile";
import Toggle from "@/components/buttons/Toggle";
import BotonSubmit from "@/components/buttons/BotonSubmit";
import Boton from "@/components/buttons/Boton";

export default function ConfigUserForm() {

    const { data: session } = useSession();
    const router = useRouter();

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        nombre_completo: "",
        email: "",
        password: "",
        foto: "",
        descripcion_perfil: "",
        perfil_privado: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { type } = event.target;

        if (type === "file") {

            const file = event.target.files?.[0];
            if (!file) return;

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
                    foto: data.url, // Guardamos la URL devuelta por el backend
                }));
            } catch (error) {
                console.error("Error al subir la imagen:", error);
            }

        }

    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(""); // Resetea el mensaje anterior
        setErrorMessage("");

        try {
            const response = await fetch("/api/users", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al actualizar el perfil");
            }

            setSuccessMessage("Perfil actualizado correctamente");
            setTimeout(() => setSuccessMessage(""), 5000); // Oculta el mensaje tras 5s
        } catch (error) {
            setErrorMessage("Hubo un error al actualizar el perfil");
            console.error("Error en la actualización:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut({ callbackUrl: "/" }); // Redirige a la página de inicio tras cerrar sesión
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (

        <div className="w-full mx-auto flex flex-col">

            {/* SECCIÓN 'EDITA TU PERFIL' */}

            <section className="w-full mx-auto flex flex-col border-y border-y-1 border-y-[var(--gris3)] py-16 px-col1 gap-12">

                <h3>Edita tu perfil</h3>

                <div className="w-full mx-auto flex flex-row justify-between gap-8">

                    <div className="w-col5 flex flex-col gap-8">
                        <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col gap-6">
                            <div className="w-full">
                                <label className="block mb-2">Tu nombre</label>
                                <Input
                                    tipo="text"
                                    id="nombre_completo"
                                    placeholder={session?.user.nombre_completo}
                                    value={formData.nombre_completo}
                                    onChange={handleChange}
                                    required={false}
                                />
                            </div>

                            <div className="w-full">
                                <label className="block mb-2">Descripción del perfil</label>
                                <Input
                                    tipo="textarea"
                                    id="descripcion_perfil"
                                    value={formData.descripcion_perfil}
                                    rows={4}
                                    onChange={handleChange}
                                    required={false}
                                />
                            </div>

                            <div className="w-full">
                                <label className="block mb-2">Foto de perfil (URL)</label>
                                <InputFile
                                    id="foto"
                                    onChange={handleFileChange}
                                    required={false}
                                    accept="image/*"
                                />
                            </div>

                            <div className="w-full flex justify-end gap-4">
                                {successMessage && (
                                    <div className="p-2 text-green-700 border rounded">
                                        {successMessage}
                                    </div>
                                )}

                                {errorMessage && (
                                    <div className="p-2 text-red-700 border rounded">
                                        {errorMessage}
                                    </div>
                                )}
                                <BotonSubmit texto="Guardar cambios" />
                            </div>
                        </form>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="w-30 h-30 ">
                            <Avatar borde="color" />
                        </div>
                        <p className="text-black text-[1.3rem] opacity-50">@{session?.user.name}</p>
                    </div>

                </div>

            </section>

            {/* SECCIÓN 'MODIFICA TUS DATOS DE ACCESO' */}

            <section className="w-full mx-auto flex flex-col border-b border-b-1 border-b-[var(--gris3)] py-16 px-col1 gap-12">

                <h3>Modifica tus datos de acceso</h3>

                <div className="w-col3 flex flex-row">

                    <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col gap-6">

                        <div className="w-col3">
                            <label className="block mb-2">Nuevo Email</label>
                            <Input
                                tipo="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required={false}
                            />
                        </div>

                        <div className="w-col3">
                            <label className="block mb-2">Nueva Contraseña</label>
                            <Input
                                tipo="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required={false}
                            />
                        </div>

                        <div className="w-full flex justify-end gap-4">
                            {successMessage && (
                                <div className="p-2 text-green-700 border rounded">
                                    {successMessage}
                                </div>
                            )}

                            {errorMessage && (
                                <div className="p-2 text-red-700 border rounded">
                                    {errorMessage}
                                </div>
                            )}
                            <BotonSubmit texto="Guardar cambios" />
                        </div>
                    </form>

                </div>

            </section>

            {/* SECCIÓN 'GESTIONA TU PRIVACIDAD' */}

            <section className="w-full mx-auto flex flex-col border-b border-b-1 border-b-[var(--gris3)] py-16 px-col1 gap-12">

                <h3>Gestiona tu privacidad</h3>

                <div className="w-col6 flex flex-row justify-start gap-6">

                    <div className="w-1/2 flex flex-row gap-4 items-center">
                        <Toggle />
                        <p>Ocultar mi insignia al resto de usuarios</p>
                    </div>

                    <div className="w-1/2 flex flex-row gap-4 items-center">
                        <Toggle />
                        <p>Ocultar mi perfil al resto de usuarios</p>
                    </div>

                </div>

            </section>

            {/* SECCIÓN 'SALIR DE SPICED' */}

            <section className="w-full mx-auto flex flex-col py-16 px-col1 gap-12">

                <h3>Salir de Spiced</h3>

                <div className="w-col6 flex flex-row justify-start gap-4">
                    <Boton texto="Desconectarse" onClick={handleLogout} tamano="grande" jerarquia="primario" />
                    <Boton texto="Eliminar tu cuenta de Spiced (esta acción es irreversible)" onClick={handleLogout} tamano="grande" jerarquia="secundario" />
                </div>

            </section>

        </div>

    );
}
