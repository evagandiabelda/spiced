import { Metadata } from "next";
import { RegistroProvider } from "@/components/RegistroContext";
import Boton from "@/components/buttons/Boton";

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
                <div className="bg-[url('/imgs/IMG-Fondo-Aside-Expertos.webp')] bg-cover bg-center flex flex-col items-center gap-16 w-full h-full p-16 pt-36">
                    <div className="flex flex-col gap-6">
                        <h3 className="text-white underline">Creando tu cuenta</h3>
                        <h1 className="text-white">Vamos a conocernos mejor</h1>
                    </div>
                    <div className="flex flex-col items-center gap-6 w-full">
                        {/* TIMELINE VERTICAL */}
                    </div>
                </div>
            </section>

            {/* CAJA PRINCIPAL: */}
            <section className='flex flex-col w-full h-full px-col1 py-[6rem] bg-[var(--gris1)] dark:bg-[var(--gris5)]'>
                <RegistroProvider>
                    {children}
                </RegistroProvider>
            </section>
        </div>
    );
}
