import SidebarPanel from "@/components/layout/SidebarPanel";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start fondo-degradado2 dark:bg-[var(--gris4)] pt-[30px] tablet:pb-[40px]'>
            {/* CAJA SIDEBAR: */}
            <section className='h-full mobile:w-full tablet:w-col3 px-[30px] py-5'>
                <SidebarPanel usuario="experto" />
            </section>

            {/* CAJA PRINCIPAL: */}
            <section className='flex flex-col h-full p-[3rem] mobile:w-full tablet:w-col9 rounded-t-[28px] tablet:rounded-t-none tablet:rounded-bl-[28px] tablet:rounded-tl-[28px] bg-[var(--blanco)] dark:bg-[var(--negro)]'>
                {children}
            </section>
        </div>
    );
}
