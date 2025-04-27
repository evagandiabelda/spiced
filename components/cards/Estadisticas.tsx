"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Estadisticas() {
    const { data: session } = useSession();
    const [numShares, setNumShares] = useState<number | null>(null);
    const [numComentarios, setNumComentarios] = useState<number | null>(null);
    const [numGuardados, setNumGuardados] = useState<number | null>(null);

    useEffect(() => {
        if (!session?.user?.name) return;

        const fetchNumShares = async () => {

            try {
                const response = await fetch("/api/users/me/shares");
                if (!response.ok) throw new Error("Error obteniendo tus shares.");

                const data = await response.json();
                setNumShares(data.shares.length);
            } catch (error) {
                console.error(error);
                setNumShares(0);
            }
        };

        const fetchNumComentarios = async () => {
            try {
                const response = await fetch("/api/users/me/comentarios/count");
                if (!response.ok) throw new Error("Error obteniendo tus comentarios.");
                const data = await response.json();
                setNumComentarios(data.count);
            } catch (error) {
                console.error(error);
                setNumComentarios(0);
            }
        };

        const fetchNumGuardados = async () => {
            try {
                const response = await fetch("/api/users/me/shares/guardados");
                if (!response.ok) throw new Error("Error obteniendo los shares que has guardado.");
                const data = await response.json();
                setNumGuardados(data.length);
            } catch (error) {
                console.error(error);
                setNumGuardados(0);
            }
        };

        fetchNumShares();
        fetchNumComentarios();
        fetchNumGuardados();
    }, [session?.user?.name]);

    return (
        <div className="min-w-col3 flex flex-col justify-between rounded-xl p-[30px] bg-[var(--tdah)] dark:bg-[var(--fondo-estadisticas)] dark:border-2 dark:border-[var(--borde-estadisticas)]">
            <div id="caja-sup" className="w-full h-full flex flex-row pb-6 border-b border-[var(--negro)]">
                <div className="w-full h-[120px]">
                    <a href="/panel-estandar/nuevo-share">
                        <div className="flex flex-row gap-2 items-center hover:scale-105 transition ease">
                            <Image
                                src="/iconos/iconos-otros/icono-agregar.svg"
                                width={28}
                                height={28}
                                alt="nuevo share"
                                className="opacity-50 dark:invert"
                            />
                            <p className="font-bold">Nuevo share</p>
                        </div>
                    </a>
                </div>
                <div className="h-full flex flex-col justify-end">
                    <a href="/panel-estandar/tus-shares">
                        <div className="w-full flex flex-col justify-end items-right gap-4">
                            <p className="font-bold text-[4rem] text-right">
                                {numShares !== null ? numShares : "..."}
                            </p>
                            <p className="text-[1.2rem] font-bold text-right">shares publicados</p>
                        </div>
                    </a>
                </div>
            </div>
            <div id="caja-inf" className="w-full flex flex-row justify-between pt-6">
                <div className="w-full h-100 flex flex-col justify-end">
                    <a href="/panel-estandar/shares-guardados">
                        <p className="text-[0.9rem] font-bold">{numGuardados !== null ? `${numGuardados} guardados` : "cargando..."}</p>
                    </a>
                </div>
                <div className="w-full h-100 flex flex-col justify-end">
                    <p className="text-[0.9rem] font-bold text-right">{numComentarios !== null ? `${numComentarios} comentarios` : "cargando..."}</p>
                </div>
            </div>
        </div>
    );
}
