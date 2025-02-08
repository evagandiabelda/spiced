"use client";

import SidebarPanel from "@/components/layout/panel/SidebarPanel";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PanelEstandarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // Redirigir si no está autenticado
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Cargando...</p>;
    }

    return (
        <>

            {/* CAJA MODO CLARO (se separan por problemas al aplicar estilos) */}
            <div className='w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start pt-[30px] pb-0 dark:hidden fondo-degradado1'>
                {/* CAJA SIDEBAR: */}
                <section className='h-full mobile:w-full tablet:w-fit laptop:w-full laptop:max-w-[360px] px-[2rem] mobile:py-0 tablet:py-5'>
                    <SidebarPanel usuario="estandar" />
                </section>

                {/* CAJA PRINCIPAL: */}
                <section className='flex flex-col w-full h-full p-[4rem] pb-[6rem] rounded-t-[28px] tablet:rounded-t-none tablet:rounded-tl-[28px] bg-[var(--gris1)]'>
                    {children}
                </section>
            </div>

            {/* CAJA MODO OSCURO (se separan por problemas al aplicar estilos) */}
            <div className='w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start pt-[30px] pb-0 hidden dark:flex bg-[var(--gris4)]'>
                {/* CAJA SIDEBAR: */}
                <section className='h-full mobile:w-full tablet:w-fit laptop:w-full laptop:max-w-[360px] px-[2rem] mobile:py-0 tablet:py-5'>
                    <SidebarPanel usuario="estandar" />
                </section>

                {/* CAJA PRINCIPAL: */}
                <section className='flex flex-col w-full h-full p-[4rem] pb-[6rem] rounded-t-[28px] tablet:rounded-t-none tablet:rounded-tl-[28px] bg-[var(--gris5)]'>
                    {children}
                </section>
            </div>

        </>
    );
}
