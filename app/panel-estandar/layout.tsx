"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SidebarPanel from "@/components/layout/panel/SidebarPanel";
import Loader from "@/components/ui/Loader";

export default function PanelEstandarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Esperar a que cargue la sesión

        if (!session) {
            // Si no hay sesión, redirigir al login:
            router.push("/login");
        } else if (session.user.userType !== "standard") {
            // Redirigir al panel correspondiente
            if (session.user.userType === "expert") {
                router.push("/panel-experto");
            } else if (session.user.userType === "admin") {
                router.push("/panel-admin");
            }
        }
    }, [session, status, router]);


    if (status === "loading") return <Loader />;

    if (session?.user.userType !== "standard") return null;

    return (
        <>
            {/* CAJA MODO CLARO */}
            <div className="w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start pt-[30px] pb-0 dark:hidden fondo-degradado1">
                {/* CAJA SIDEBAR */}
                <section className="h-full mobile:w-full tablet:w-fit laptop:w-full laptop:max-w-[360px] px-[2rem] mobile:py-0 tablet:py-5">
                    <SidebarPanel usuario="estandar" />
                </section>

                {/* CAJA PRINCIPAL */}
                <section className="flex flex-col w-full h-full p-[4rem] pb-[6rem] rounded-t-[28px] tablet:rounded-t-none tablet:rounded-tl-[28px] bg-[var(--gris1)]">
                    {children}
                </section>
            </div>

            {/* CAJA MODO OSCURO */}
            <div className="w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start pt-[30px] pb-0 hidden dark:flex bg-[var(--gris4)]">
                {/* CAJA SIDEBAR */}
                <section className="h-full mobile:w-full tablet:w-fit laptop:w-full laptop:max-w-[360px] px-[2rem] mobile:py-0 tablet:py-5">
                    <SidebarPanel usuario="estandar" />
                </section>

                {/* CAJA PRINCIPAL */}
                <section className="flex flex-col w-full h-full p-[4rem] pb-[6rem] rounded-t-[28px] tablet:rounded-t-none tablet:rounded-tl-[28px] bg-[var(--gris5)]">
                    {children}
                </section>
            </div>
        </>
    );
}
