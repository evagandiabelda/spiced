import { Metadata } from "next";
import SidebarPanel from "@/components/layout/panel/SidebarPanel";

export const metadata: Metadata = {
    title: 'Espacio personal',
};

export default function PanelEstandarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>

            {/* CAJA MODO CLARO (se separan por problemas al aplicar estilos) */}
            <div className='w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start pt-[30px] pb-0 dark:hidden fondo-degradado2'>
                {/* CAJA SIDEBAR: */}
                <section className='h-full mobile:w-full tablet:w-fit laptop:w-full laptop:max-w-[360px] px-[2rem] mobile:py-0 tablet:py-5'>
                    <SidebarPanel usuario="experto" />
                </section>

                {/* CAJA PRINCIPAL: */}
                <section className='flex flex-col w-full h-full p-[4rem] pb-[6rem] rounded-t-[28px] tablet:rounded-t-none tablet:rounded-tl-[28px] bg-[var(--blanco)]'>
                    {children}
                </section>
            </div>

            {/* CAJA MODO OSCURO (se separan por problemas al aplicar estilos) */}
            <div className='w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start pt-[30px] pb-0 hidden dark:flex bg-[var(--gris5)]'>
                {/* CAJA SIDEBAR: */}
                <section className='h-full mobile:w-full tablet:w-fit laptop:w-full laptop:max-w-[360px] px-[2rem] mobile:py-0 tablet:py-5'>
                    <SidebarPanel usuario="experto" />
                </section>

                {/* CAJA PRINCIPAL: */}
                <section className='flex flex-col w-full h-full p-[4rem] pb-[6rem] rounded-t-[28px] tablet:rounded-t-none tablet:rounded-tl-[28px] bg-[var(--gris4)]'>
                    {children}
                </section>
            </div>

        </>
    );
}
