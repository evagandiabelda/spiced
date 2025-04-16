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

    // Redirigir a login si el usuario no está autenticado
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    // Mientras se carga la sesión, mostramos un loader
    if (status === "loading") {
        return <Loader />;
    }

    if (!session) return null; // Evita renderizar contenido innecesario antes de la redirección

    return (
        <>
            {/* CAJA MODO CLARO */}
            <div className="w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start pt-[30px] pb-0 dark:hidden fondo-degradado2">
                {/* CAJA SIDEBAR */}
                <section className="h-full mobile:w-full tablet:w-fit laptop:w-full laptop:max-w-[360px] px-[2rem] mobile:py-0 tablet:py-5">
                    <SidebarPanel usuario="experto" />
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
                    <SidebarPanel usuario="experto" />
                </section>

                {/* CAJA PRINCIPAL */}
                <section className="flex flex-col w-full h-full p-[4rem] pb-[6rem] rounded-t-[28px] tablet:rounded-t-none tablet:rounded-tl-[28px] bg-[var(--gris5)]">
                    {children}
                </section>
            </div>
        </>
    );
}
