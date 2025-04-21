"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Image from "next/image";
import ThemeToggle from "@/components/buttons/ThemeToggle";
import ListaUsuarios from "@/components/panel/ListaUsuarios";
import ListaDenuncias from "@/components/panel/ListaDenuncias";
import Boton from "@/components/buttons/Boton";

export default function Inicio() {

    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // Redirigir si no está autenticado
        }
    }, [status, router]);

    const handleLogout = async () => {
        try {
            await signOut({ callbackUrl: "/" }); // Redirige a la página de inicio tras cerrar sesión
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="w-full flex flex-col gap-12">

            {/* CABECERA: */}
            <div className="w-full flex flex-col gap-8">
                <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                    <h2 className="dark:text-[var(--gris3)]">Panel de Administrador</h2>
                    <div className="flex flex-row justify-end items-center gap-4">
                        <ThemeToggle />
                        <Boton texto="Cerrar sesión" onClick={handleLogout} tamano="pequeno" jerarquia="secundario" />
                    </div>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-4">

                <div className="w-full flex mobile:flex-col laptop:flex-row justify-between gap-4">

                    {/* Card Últimas Denuncias: */}
                    <div className="w-full flex flex-col rounded-xl bg-[#D84C60] p-[30px] pt-[24px] gap-5 dark:bg-[var(--fondo-denuncias)] dark:border-2 dark:border-[var(--borde-denuncias)]">
                        <div className="w-full flex flex-row justify-between items-center px-2">
                            <h3 className="text-white dark:text-[var(--gris2)]">Últimas denuncias</h3>
                            <Image
                                src="/iconos/iconos-menu/icono-denuncias.svg"
                                width={20}
                                height={20}
                                className="dark:invert opacity-50"
                                alt="últimos shares guardados"
                            />
                        </div>
                        <ListaDenuncias numItems={3} />
                    </div>

                </div>

                {/* Card Últimos Usuarios: */}
                <div className="w-full h-auto flex flex-col rounded-xl bg-[var(--tpa)] p-[30px] pt-[24px] gap-5 dark:bg-[var(--fondo-shares)] dark:border-2 dark:border-[var(--borde-shares)]">
                    <div className="w-full flex flex-row justify-between items-center px-2">
                        <h3 className="dark:text-[var(--gris2)]">Últimos usuarios</h3>
                        <Image
                            src="/iconos/iconos-menu/icono-usuarios.svg"
                            width={20}
                            height={20}
                            className="dark:invert opacity-50"
                            alt="últimos shares guardados"
                        />
                    </div>
                    <ListaUsuarios numItems={3} />
                </div>
            </div>

        </div>
    );
}
