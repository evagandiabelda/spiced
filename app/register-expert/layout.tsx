import { Metadata } from "next";
import { RegistroProvider } from "@/context/RegistroContext";
import RegistroSidebar from "@/components/layout/RegistroSidebar";

export const metadata: Metadata = {
    title: 'Regístrate',
};

export default function PanelEstandarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className='w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start'>
            {/* CAJA SIDEBAR: */}
            <section className='dark h-full mobile:w-full laptop:w-col4'>
                <RegistroSidebar
                    usuario="expert"
                />
            </section>

            {/* CAJA PRINCIPAL: */}
            <section className='flex flex-col w-full h-full px-col1 pt-[4rem] pb-[6rem] bg-[var(--gris1)] dark:bg-[var(--gris5)]'>
                <RegistroProvider>
                    {children}
                </RegistroProvider>
            </section>
        </div>
    );
}
