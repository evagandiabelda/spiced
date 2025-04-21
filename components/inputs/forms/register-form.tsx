"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegistro } from "@/context/RegistroContext";
import Input from "@/components/inputs/Input";
import BotonSubmit from "@/components/buttons/BotonSubmit";

interface RegisterFormProps {
    usuario: "standard" | "expert";
}

export default function RegisterForm({ usuario }: RegisterFormProps) {

    const router = useRouter();

    const { setRegistroData } = useRegistro();

    // Datos que se piden en este paso:
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorEmail('');

        // Comprobar si el email ya existe:
        const res = await fetch('/api/auth/register/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (data.exists) {
            setErrorEmail('Ya existe una cuenta registrada con este correo.');
            return;
        }

        // Si todo está bien, guardar en contexto y continuar:
        setRegistroData({
            email,
            password,
        });

        if (usuario === "standard") {
            router.push("/register/paso-1");
        }
        else if (usuario === "expert") {
            router.push("/register-expert/paso-1");
        }

    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-4 px-col1">
            <h1 className="dark:text-[var(--gris3)]">Regístrate en Spiced</h1>

            <div className="w-full flex flex-col flex-1 align-center gap-12 pb-4 pt-8 max-w-[360px]">

                {/* INPUTS */}

                <div className="w-full flex flex-col gap-8">

                    {usuario === "standard" &&
                        <div>
                            <p className="w-full text-[0.9rem] font-bold text-[var(--gris2)] dark:text-[var(--gris3)] text-center">¿Eres un profesional de la salud mental?</p>
                            <p className="w-full text-center"><a href="/register-expert" className="underline text-[0.9rem] font-bold text-[var(--gris2)] dark:text-[var(--gris3)] dark:hover:text-[var(--gris2)] text-center">Verifica tu cuenta gratis.</a></p>
                        </div>
                    }

                    {usuario === "expert" &&
                        <p className="w-full text-[0.9rem] font-bold text-[var(--gris2)] text-center">Registro exclusivo para profesionales.</p>
                    }

                    <div className="w-full flex flex-col gap-10">
                        <div className="w-full flex flex-col gap-4">
                            <label htmlFor="email">Tu correo electrónico</label>
                            <Input
                                tipo="email"
                                icon={true}
                                id="email"
                                placeholder="email@ejemplo.com"
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errorEmail && (
                                <p className="text-sm text-red-500 mt-2">{errorEmail}</p>
                            )}
                        </div>

                        <div className="w-full flex flex-col gap-4">
                            <label htmlFor="password">Escribe una contraseña segura</label>
                            <Input
                                tipo="password"
                                icon={true}
                                id="password"
                                placeholder="Contraseña"
                                required={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                </div>

                {/* BOTONES */}

                <div className="w-full flex flex-col items-center">
                    <BotonSubmit texto="Regístrate" />
                </div>

            </div>

        </form>
    );
}
