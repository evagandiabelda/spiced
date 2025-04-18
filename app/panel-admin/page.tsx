"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Image from "next/image";
import ThemeToggle from "@/components/buttons/ThemeToggle";
import EstadisticasAdmin from "@/components/cards/EstadisticasAdmin";
import ListaUsuariosRegistrados from "@/components/layout/panel/ListaUsuariosRegistrados";
import ListaDenuncias from "@/components/layout/panel/ListaDenuncias";

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
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex mobile:flex-col tablet:flex-row gap-4">
                <div className="w-full flex mobile:flex-col laptop:flex-row justify-between gap-4">
                    <div className="w-full flex flex-col gap-4">
                        {/* Card Estadísticas: */}
                        <EstadisticasAdmin />
                        {/* Card Últimas Denuncias: */}
                        <div className="w-full flex flex-col rounded-xl bg-[#D84C60] p-[30px] pt-[24px] gap-5 dark:bg-[var(--fondo-denuncias)] dark:border-2 dark:border-[var(--borde-denuncias)]">
                            <div className="w-full flex flex-row justify-between items-center">
                                <h3 className="text-white">Últimas denuncias</h3>
                                <Image
                                    src="/iconos/iconos-menu/icono-denuncias.svg"
                                    width={20}
                                    height={20}
                                    className="dark:invert opacity-50"
                                    alt="últimos shares guardados"
                                />
                            </div>
                            <ListaDenuncias numItems={5} />
                        </div>
                    </div>
                </div>
                {/* Card Últimos Usuarios: */}
                <div className="self-start w-full h-auto flex flex-col rounded-xl bg-[var(--tpa)] p-[30px] pt-[24px] gap-5 dark:bg-[var(--fondo-shares)] dark:border-2 dark:border-[var(--borde-shares)]">
                    <div className="w-full flex flex-row justify-between items-center">
                        <h3>Últimos usuarios</h3>
                        <Image
                            src="/iconos/iconos-menu/icono-usuarios.svg"
                            width={20}
                            height={20}
                            className="dark:invert opacity-50"
                            alt="últimos shares guardados"
                        />
                    </div>
                    <ListaUsuariosRegistrados numItems={5} />
                </div>
            </div>

        </div>
    );
}
