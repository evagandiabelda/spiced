"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function EstadisticasAdmin() {
    const { data: session } = useSession();
    const [numShares, setNumShares] = useState<number | null>(null);
    const [numComentarios, setNumComentarios] = useState<number | null>(null);
    const [numUsuarios, setNumUsuarios] = useState<number | null>(null);

    useEffect(() => {
        if (!session?.user?.name) return;

        const fetchNumShares = async () => {

            try {
                const response = await fetch("/api/shares");
                if (!response.ok) throw new Error("Error obteniendo los shares.");

                const data = await response.json();
                setNumShares(data.shares.length);
            } catch (error) {
                console.error(error);
                setNumShares(0);
            }
        };

        const fetchNumComentarios = async () => {
            try {
                const response = await fetch("/api/comentarios");
                if (!response.ok) throw new Error("Error obteniendo los comentarios.");
                const data = await response.json();
                setNumComentarios(data.comentarios.length);
            } catch (error) {
                console.error(error);
                setNumComentarios(0);
            }
        };

        const fetchNumUsuarios = async () => {
            try {
                const response = await fetch("/api/users");
                if (!response.ok) throw new Error("Error obteniendo los usuarios.");
                const data = await response.json();
                setNumUsuarios(data.users.length);
            } catch (error) {
                console.error(error);
                setNumUsuarios(0);
            }
        };

        fetchNumShares();
        fetchNumComentarios();
        fetchNumUsuarios();
    }, [session?.user?.name]);

    return (
        <div className="w-full max-h-[260px] flex flex-col justify-between rounded-xl p-[30px] bg-[var(--tdah)] dark:bg-[var(--fondo-estadisticas)] dark:border-2 dark:border-[var(--borde-estadisticas)]">
            <div id="caja-sup" className="w-full flex flex-col pb-6 border-b border-[var(--negro)]">
                <div className="w-full h-100">
                    <p className="font-bold">Estadísticas</p>
                </div>
                <div className="w-full flex flex-col justify-end">
                    <a href="/explorar">
                        <div className="w-full h-100 flex flex-col justify-end items-right gap-2">
                            <p className="w-full font-bold text-[4rem] text-right">
                                {numShares !== null ? numShares : "..."}
                            </p>
                            <p className="text-[1.2rem] font-bold text-right">shares publicados</p>
                        </div>
                    </a>
                </div>
            </div>
            <div id="caja-inf" className="w-full h-[100px] flex flex-row justify-between">
                <div className="w-full h-100 flex flex-col justify-end">
                    <a href="/panel-estandar/shares-guardados">
                        <p className="text-[0.9rem] font-bold">{numUsuarios !== null ? `${numUsuarios} usuarios` : "cargando..."}</p>
                    </a>
                </div>
                <div className="w-full h-100 flex flex-col justify-end">
                    <p className="text-[0.9rem] font-bold text-right">{numComentarios !== null ? `${numComentarios} comentarios` : "cargando..."}</p>
                </div>
            </div>
        </div>
    );
}
