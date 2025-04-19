"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Image from "next/image";
import ThemeToggle from "@/components/buttons/ThemeToggle";
import Estadisticas from "@/components/cards/Estadisticas";
import Boton from "@/components/buttons/Boton";
import ListaSharesPublicados from "@/components/panel/ListaSharesPublicados";
import Input from "@/components/inputs/Input";

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
                    <h2>Tu espacio personal</h2>
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
                <div className="w-full flex flex-col gap-3">
                    <p>Qué bien verte por aquí. ¿Cómo estás hoy? Desde aquí podrás gestionar tu cuenta, compartir cositas con la comunidad de Spice, consultar tus notificaciones y mucho más. ¡Adelante, explora!</p>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex mobile:flex-col laptop:flex-row justify-between gap-4">
                    {/* Card Estadísticas: */}
                    <Estadisticas />
                    {/* Card Descripción: */}
                    <div className="w-full flex flex-col justify-between gap-2 rounded-xl bg-[#ffb6c3] px-[36px] py-[40px] gap-[2.8rem] dark:bg-[var(--fondo-pinguinadas)] dark:border-2 dark:border-[var(--borde-pinguinadas)]">
                        <h3>Tu descripción</h3>
                        <p>Añade una descripción a tu perfil para que otros usuarios entiendan mejor tu perfil profesional.</p>
                        <div className="rounded-[1rem] border border-2 dark:border-[var(--borde-pinguinadas)] overflow-hidden">
                            <Input tipo="text" id="nombre_usuario" placeholder="Descríbete como tú quieras" required={true} />
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="dark:hidden">
                                <Boton texto="Guardar" enlace="#" tamano="grande" jerarquia="primario" />
                            </div>
                            <div className="hidden dark:block">
                                <Boton texto="Guardar" enlace="#" tamano="grande" jerarquia="primario" customColor="var(--fob)" />
                            </div>
                        </div>
                    </div>
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
                    <ListaSharesPublicados />
                </div>
            </div>

        </div>
    );
}
