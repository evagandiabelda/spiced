"use client";

import AvatarPropio from "@/components/icons/AvatarPropio";
import MenuSidebar from "@/components/panel/MenuSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type SidebarPanelProps = {
    usuario: "estandar" | "experto" | "admin";
};

export default function SidebarPanel({ usuario }: SidebarPanelProps) {

    const { data: session, status } = useSession();
    const router = useRouter();

    let insignia = "Pequeño Saltamontes" // Insignia base por defecto.

    if (session?.user.insignia === "cacahuete_sabio") {
        insignia = "Cacahuete Sabio"
    }
    else if (session?.user.insignia === "cactus_legendario") {
        insignia = "Cactus Legendario"
    }

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // Redirigir si no está autenticado
        }
    }, [status, router]);

    return (
        <div className="w-full flex flex-col">
            <div>
                <div className="w-full flex flex-row items-center gap-4 pb-7 border-b border-b-[var(--gris2)] dark:border-b-[var(--gris3)]">
                    {/* Avatar Modo Claro */}
                    <div className="mobile:w-12 mobile:h-12 laptop:w-16 laptop:h-16 dark:hidden">
                        <AvatarPropio customBorder="#fff" />
                    </div>
                    {/* Avatar Modo Oscuro */}
                    <div className="mobile:w-12 mobile:h-12 laptop:w-16 laptop:h-16 hidden dark:block">
                        <AvatarPropio />
                    </div>
                    <div className="mobile:flex tablet:hidden laptop:flex flex-col gap-2">

                        <h4 className="m-0 text-[var(--blanco)] dark:text-[var(--gris2)]">¡Hola, {session?.user.nombre_real}!</h4>

                        {/* Usuario Estándar (muestra insignia): */}
                        {usuario === "estandar" &&
                            <p className="mobile:hidden laptop:block font-normal text-[0.7rem] opacity-60"><span className="text-[var(--blanco)] dark:text-[var(--gris2)]">{insignia}</span></p>
                        }

                        {/* Usuario Experto No-Verificado: */}
                        {usuario === "experto" && !session?.user.usuario_verificado &&
                            <p className="mobile:hidden laptop:block font-normal text-[0.7rem] opacity-60"><span className="text-[var(--blanco)] dark:text-[var(--gris2)]">Verificación en proceso</span></p>
                        }

                        {/* Usuario Experto Verificado: */}
                        {usuario === "experto" && session?.user.usuario_verificado &&
                            <p className="mobile:hidden laptop:block font-normal text-[0.7rem] opacity-60"><span className="text-[var(--blanco)] dark:text-[var(--gris2)]">Usuario verificado</span></p>
                        }

                        {/* Usuario Admin: */}
                        {usuario === "admin" &&
                            <p className="mobile:hidden laptop:block font-normal text-[0.7rem] opacity-60"><span className="text-[var(--blanco)] dark:text-[var(--gris2)]">Administrador</span></p>
                        }
                    </div>
                </div>

                <div className="py-[24px]">
                    <MenuSidebar usuario={usuario} />
                </div>
            </div>
        </div>
    );

};