import { Metadata } from "next";
import Boton from "@/components/buttons/Boton";

export const metadata: Metadata = {
    title: 'Accede',
};


export default function PanelEstandarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className='w-full flex mobile:flex-col-reverse tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start'>
            {/* CAJA PRINCIPAL: */}
            <section className='flex flex-col w-full h-full p-[4rem] pb-[6rem] bg-[var(--gris1)] dark:bg-[var(--gris5)]'>
                {children}
            </section>

            {/* CAJA SIDEBAR: */}
            <section className='dark h-full mobile:w-full laptop:w-col4'>
                <div className="bg-[url('/imgs/IMG-Fondo-Aside-Login.webp')] bg-cover bg-center flex flex-col items-center justify-center gap-16 w-full h-full p-16">
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="text-white text-center">¡Hola de nuevo!</h1>
                        <p className="text-white text-center">Nos encanta verte por aquí. ¿Entramos?</p>
                    </div>
                    <div className="flex flex-col items-center gap-6 w-full">
                        <p className="tag text-white font-normal text-center">¿Todavía no tienes cuenta?</p>
                        <Boton texto="Regístrate" enlace="/register" tamano="grande" jerarquia="secundario" customColor="white" />
                    </div>
                </div>
            </section>
        </div>
    );
}
