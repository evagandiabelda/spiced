"use client";

import { toast } from "react-hot-toast";
import Input from "@/components/inputs/Input";
import BotonSubmit from "@/components/buttons/BotonSubmit";

export default function DudasForm() {

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = (document.getElementById("email") as HTMLInputElement).value;
        const mensaje = (document.getElementById("mensaje") as HTMLTextAreaElement).value;

        try {
            const res = await fetch("/api/contacto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, mensaje }),
            });

            if (!res.ok) throw new Error("No se pudo enviar el mensaje.");
            toast.success("Mensaje enviado con éxito");
        } catch (err) {
            toast.error("Hubo un problema al enviar tu mensaje.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 tablet:px-col1 laptop:px-col2">
            <div className="w-full flex flex-col gap-4">
                <label htmlFor="email">Indícanos tu email para poder responderte:</label>
                <Input
                    tipo="email"
                    icon
                    id="email"
                    placeholder="email@ejemplo.com"
                    required
                />
            </div>
            <div className="w-full flex flex-col gap-4">
                <label htmlFor="mensaje">Explícanos tu duda brevemente:</label>
                <Input
                    tipo="textarea"
                    icon
                    id="mensaje"
                    placeholder="Escribe aquí tu pregunta..."
                    rows={6}
                    required
                />
            </div>
            <div className="w-full flex justify-center items-center">
                <BotonSubmit
                    texto="Enviar"
                />
            </div>
        </form>
    );
}