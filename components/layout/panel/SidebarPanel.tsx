"use client";

import Avatar from "@/components/icons/Avatar";
import MenuSidebar from "@/components/layout/panel/MenuSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type SidebarPanelProps = {
    usuario: "estandar" | "experto";
};

const SidebarPanel = ({ usuario }: SidebarPanelProps) => {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // Redirigir si no está autenticado
        }
    }, [status, router]);

    const href = "/panel-" + usuario + "/configuracion";

    return (
        <div className="w-full flex flex-col">
            <div>
                <div className="w-full flex flex-row items-center gap-4 pb-7 border-b border-b-[var(--gris2)] dark:border-b-[var(--gris3)]">
                    {/* Avatar Modo Claro */}
                    <a href={href} className="mobile:w-12 laptop:w-16 dark:hidden">
                        <Avatar borde="blanco" />
                    </a>
                    {/* Avatar Modo Oscuro */}
                    <a href={href} className="mobile:w-12 laptop:w-16 hidden dark:block">
                        <Avatar borde={usuario === "estandar" ? "standard" : "expert"} />
                    </a>
                    <div className="mobile:flex tablet:hidden laptop:flex flex-col gap-3">
                        <h3 className="m-0 text-[var(--blanco)] dark:text-[var(--gris2)]">¡Hola, {session?.user.nombre_completo}!</h3>
                        {usuario === "estandar" &&
                            <p className="mobile:hidden laptop:block font-normal text-[0.7rem] opacity-60"><span className="text-[var(--blanco)] dark:text-[var(--gris2)]">{session?.user.insignia}</span></p>
                        }
                        {usuario === "experto" && session?.user.usuario_verificado &&
                            <p className="mobile:hidden laptop:block font-normal text-[0.7rem] opacity-60"><span className="text-[var(--blanco)] dark:text-[var(--gris2)]">Usuario verificado</span></p>
                        }
                        {usuario === "experto" && session?.user.usuario_verificado === false &&
                            <p className="mobile:hidden laptop:block font-normal text-[0.7rem] opacity-60"><span className="text-[var(--blanco)] dark:text-[var(--gris2)]">Verificación en proceso</span></p>
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

export default SidebarPanel;
