import SidebarPanel from "@/components/layout/panel/SidebarPanel";

export default function PanelEstandarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>

            {/* CAJA MODO CLARO (se separan problemas al aplicar estilos) */}
            <div className='w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start pt-[30px] tablet:pb-[40px] dark:hidden fondo-degradado2'>
                {/* CAJA SIDEBAR: */}
                <section className='h-full mobile:w-full tablet:w-fit laptop:w-full laptop:max-w-col3 px-[30px] mobile:py-0 tablet:py-5'>
                    <SidebarPanel usuario="experto" />
                </section>

                {/* CAJA PRINCIPAL: */}
                <section className='flex flex-col h-full mobile:px-col1 tablet:px-[3rem] py-[3rem] mobile:w-full laptop:max-w-col9 rounded-t-[28px] tablet:rounded-t-none tablet:rounded-bl-[28px] tablet:rounded-tl-[28px] bg-[var(--blanco)]'>
                    {children}
                </section>
            </div>

            {/* CAJA MODO OSCURO (se separan problemas al aplicar estilos) */}
            <div className='w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start pt-[30px] tablet:pb-[40px] hidden dark:flex dark:bg-[var(--gris5)]'>
                {/* CAJA SIDEBAR: */}
                <section className='h-full mobile:w-full tablet:w-fit laptop:w-full laptop:max-w-col3 px-[30px] mobile:py-0 tablet:py-5'>
                    <SidebarPanel usuario="experto" />
                </section>

                {/* CAJA PRINCIPAL: */}
                <section className='flex flex-col h-full mobile:px-col1 tablet:px-[3rem] py-[3rem] mobile:w-full laptop:max-w-col9 rounded-t-[28px] tablet:rounded-t-none tablet:rounded-bl-[28px] tablet:rounded-tl-[28px] bg-[var(--negro)]'>
                    {children}
                </section>
            </div>

        </>
    );
}
