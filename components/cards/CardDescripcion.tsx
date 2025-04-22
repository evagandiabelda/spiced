"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Input from "@/components/inputs/Input";
import Boton from "@/components/buttons/Boton";

export default function CardDescripcion() {

    const [descripcion, setDescripcion] = useState("");

    const handleGuardar = async () => {

        const loadingToast = toast.loading("Guardando cambios...");

        try {
            const res = await fetch("/api/users/me", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ descripcion_perfil: descripcion }),
            });

            const data = await res.json();
            toast.dismiss(loadingToast);

            if (res.ok) {
                toast.success("¡Descripción actualizada!");
                setDescripcion("");
            } else {
                toast.error(data.error || "Error al guardar");
            }
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Error al conectar con el servidor");
        }
    };

    return (
        <div className="w-full flex flex-col justify-between gap-2 rounded-xl bg-[#ffb6c3] px-[36px] py-[40px] gap-[2.8rem] dark:bg-[var(--fondo-pinguinadas)] dark:border-2 dark:border-[var(--borde-pinguinadas)]">
            <h3>Tu descripción</h3>
            <p>Añade una descripción a tu perfil para que otros usuarios entiendan mejor tu perfil profesional.</p>
            <div className="rounded-[1rem] border border-2 dark:border-[var(--borde-pinguinadas)] overflow-hidden">
                <Input
                    tipo="text"
                    id="descripcion"
                    placeholder="Descríbete como tú quieras"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required={true}
                />
            </div>
            <div className="w-full flex justify-end">
                <div className="dark:hidden">
                    <Boton
                        texto="Guardar"
                        tamano="grande"
                        jerarquia="primario"
                        onClick={handleGuardar}
                    />
                </div>
                <div className="hidden dark:block">
                    <Boton
                        texto="Guardar"
                        tamano="grande"
                        jerarquia="primario"
                        customColor="var(--fob)"
                        onClick={handleGuardar}
                    />
                </div>
            </div>
        </div>
    )

}