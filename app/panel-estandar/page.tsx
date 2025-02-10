"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Image from "next/image";
import ThemeToggle from "@/components/buttons/ThemeToggle";
import Estadisticas from "@/components/cards/Estadisticas";
import Boton from "@/components/buttons/Boton";
import ListaShares from "@/components/layout/panel/ListaShares";
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
                            <Image
                                src="/iconos/iconos-otros/icono-insignia-mini-1.svg"
                                width={32}
                                height={32}
                                className="cursor-pointer hover:scale-110 transition ease dark:opacity-70 dark:hover:opacity-100"
                                alt="insignia actual"
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
                    {/* Card Pingüinadas: */}
                    <div className="w-full flex mobile:flex-col-reverse tablet:flex-row gap-2 rounded-xl bg-[var(--fob)] px-[36px] py-[40px] gap-[2.8rem] dark:bg-transparent dark:border-2 dark:border-[var(--fob)]">
                        <div id="caja-izq" className="w-full h-100 flex flex-col justify-center gap-8">
                            <p>Los pingüinos suelen regalarse piedrecitas unos a otros en señal de afecto. Envía una pingüinada a alguien que te importe.</p>
                            <Input tipo="text" id="nombre_usuario" placeholder="Su nombre de usuario" required={true} />
                            <div className="dark:hidden">
                                <Boton texto="Enviar una pingüinada" enlace="#" tamano="pequeno" jerarquia="primario" />
                            </div>
                            <div className="hidden dark:block">
                                <Boton texto="Enviar una pingüinada" enlace="#" tamano="pequeno" jerarquia="primario" customColor="var(--fob)" />
                            </div>
                        </div>
                        <div id="caja-der" className="min-w-col1 h-100 flex flex-col justify-center items-center">
                            <Image
                                src="/imgs/IMG-Pinguino.svg"
                                width={300}
                                height={300}
                                alt="imagen de un pingüino"
                            />
                        </div>
                    </div>
                </div>
                {/* Card Últimos Shares Guardados: */}
                <div className="w-full flex flex-col rounded-xl bg-[var(--tpa)] p-[30px] pt-[24px] gap-3 dark:bg-transparent dark:border-2 dark:border-[var(--tpa)]">
                    <div className="w-full flex flex-row justify-between items-start">
                        <h4>Mis últimos shares</h4>
                        <Image
                            src="/iconos/iconos-menu/icono-guardado.svg"
                            width={18}
                            height={18}
                            className="dark:invert"
                            alt="últimos shares guardados"
                        />
                    </div>
                    <ListaShares />
                </div>
            </div>

        </div>
    );
}
