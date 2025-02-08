"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BotonLogin } from "@/components/buttons/BotonLogin";
import Input from "@/components/inputs/Input";

export default function SigninForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        nombre_completo: "",
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Manejar cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Enviar formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error);
            return;
        }

        // Redirigir al login después de registrar
        router.push("/login");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 justify-center">
            <h1>Regístrate en Spiced</h1>

            <div className="w-full flex flex-col flex-1 align-center gap-16 rounded-lg px-6 pb-4 pt-8">

                {/* INPUTS */}

                <div className="w-full flex flex-col gap-8">

                    {/* Fila superior */}
                    <div className="w-full flex flex-row gap-8">

                        <div className="w-full">
                            <label className="mb-3 mt-5 block" htmlFor="nombre_completo">¿Cómo te llamas?</label>
                            <Input
                                tipo="text"
                                id="nombre_completo"
                                placeholder="Nombre completo"
                                required={true}
                                value={form.nombre_completo}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="w-full">
                            <label className="mb-3 mt-5 block" htmlFor="name">Elige un nombre de usuario único</label>
                            <Input
                                tipo="text"
                                icon={true}
                                id="name"
                                placeholder="Nombre de usuario"
                                required={true}
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    {/* Fila inferior */}
                    <div className="w-full flex flex-row gap-8">

                        <div className="w-full">
                            <label className="mb-3 mt-5 block" htmlFor="email">Tu correo electrónico</label>
                            <Input
                                tipo="email"
                                icon={true}
                                id="email"
                                placeholder="email@ejemplo.com"
                                required={true}
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="w-full">
                            <label className="mb-3 mt-5 block" htmlFor="password">Escribe una contraseña segura</label>
                            <Input
                                tipo="password"
                                icon={true}
                                id="password"
                                placeholder="Contraseña"
                                required={true}
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                </div>

                {/* BOTONES */}

                <div className="flex flex-row justify-end">
                    <BotonLogin aria-disabled={loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </BotonLogin>
                    {error && <p className="text-red-500">{error}</p>}
                </div>

            </div>

        </form>
    );
}
