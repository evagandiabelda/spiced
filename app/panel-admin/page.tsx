"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Image from "next/image";
import ThemeToggle from "@/components/buttons/ThemeToggle";
import Estadisticas from "@/components/cards/Estadisticas";

export default function Inicio() {

    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // Redirigir si no está autenticado
        }
    }, [status, router]);

    return (
        <div className="w-full flex flex-col gap-12">

            {/* CABECERA: */}
            <div className="w-full flex flex-col gap-8">
                <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                    <h2>Panel de Administrador</h2>
                    <div className="flex flex-row justify-end gap-6">
                        <div className="flex flex-row justify-end gap-4">
                            <Image
                                src="/iconos/iconos-menu/icono-notificaciones.svg"
                                width={32}
                                height={32}
                                className="cursor-pointer hover:scale-110 transition ease dark:invert dark:opacity-70 dark:hover:opacity-100"
                                alt="notificaciones"
                            />
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex mobile:flex-col laptop:flex-row justify-between gap-4">
                    {/* Card Estadísticas: */}
                    <Estadisticas />
                </div>
                {/* Card Últimos Shares Guardados: */}
                <div className="w-full flex flex-col rounded-xl bg-[var(--tpa)] p-[30px] pt-[24px] gap-5 dark:bg-[var(--fondo-shares)] dark:border-2 dark:border-[var(--borde-shares)]">
                    <div className="w-full flex flex-row justify-between items-center">
                        <h3>Tus últimos shares</h3>
                        <Image
                            src="/iconos/iconos-menu/icono-guardado.svg"
                            width={18}
                            height={18}
                            className="dark:invert opacity-50"
                            alt="últimos shares guardados"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}
