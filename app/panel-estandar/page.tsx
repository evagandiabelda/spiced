"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Image from "next/image";
import ThemeToggle from "@/components/buttons/ThemeToggle";
import Estadisticas from "@/components/cards/Estadisticas";
import CardDescripcion from "@/components/cards/CardDescripcion";
import Boton from "@/components/buttons/Boton";
import ListaSharesPublicados from "@/components/panel/ListaSharesPublicados";
import { Insignia } from "@prisma/client";

export default function PanelEstandar() {

    const { status, data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // Redirigir si no está autenticado
        }
    }, [status, router]);

    const perfilHref = `/perfil/${session?.user.name}`;

    let iconoInsignia = "/iconos/iconos-otros/icono-insignia-mini-1.svg";

    if (session?.user.insignia === Insignia.cacahuete_sabio) {
        iconoInsignia = "/iconos/iconos-otros/icono-insignia-mini-2.svg";
    }
    if (session?.user.insignia === Insignia.cactus_legendario) {
        iconoInsignia = "/iconos/iconos-otros/icono-insignia-mini-3.svg";
    }

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
                    <h2 className="dark:text-[var(--gris3)]">Tu espacio personal</h2>
                    <div className="flex flex-row justify-end items-center gap-3">
                        <a href="/panel-estandar/insignias">
                            <Image
                                src={iconoInsignia}
                                width={32}
                                height={32}
                                className="cursor-pointer hover:scale-110 transition ease dark:opacity-70 dark:hover:opacity-100"
                                alt="insignia actual"
                            />
                        </a>
                        <Boton
                            texto="Ver mi perfil"
                            enlace={perfilHref}
                            tamano="pequeno"
                            jerarquia="secundario"
                        />
                        <ThemeToggle />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <p className="dark:text-[var(--gris3)]">Qué bien verte por aquí. ¿Cómo estás hoy? Desde aquí podrás gestionar tu cuenta, compartir cositas con la comunidad de Spice, consultar tus notificaciones y mucho más. ¡Adelante, explora!</p>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex mobile:flex-col laptop:flex-row justify-between gap-4">
                    {/* Card Estadísticas: */}
                    <Estadisticas />
                    {/* Card Descripción: */}
                    <CardDescripcion usuario="standard" />
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
