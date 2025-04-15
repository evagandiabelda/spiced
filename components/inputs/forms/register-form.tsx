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

    // Guardado de datos en contexto y Redirección:
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

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
            <h1>Regístrate en Spiced</h1>

            <div className="w-full flex flex-col flex-1 align-center gap-16 pb-4 pt-8 max-w-[360px]">

                {/* INPUTS */}

                <div className="w-full flex flex-col gap-8">

                    <div className="w-full">
                        <label className="mb-3 mt-5 block" htmlFor="email">Tu correo electrónico</label>
                        <Input
                            tipo="email"
                            icon={true}
                            id="email"
                            placeholder="email@ejemplo.com"
                            required={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                </div>

                {/* BOTONES */}

                <div className="flex flex-row justify-end">
                    <BotonSubmit
                        texto="Regístrate"
                    />
                </div>

            </div>

        </form>
    );
}
