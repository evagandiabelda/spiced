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
                <div className="bg-[url('/imgs/IMG-Fondo-Aside-Signin.webp')] bg-cover bg-center flex flex-col items-center gap-16 w-full h-full p-16 pt-36">
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="text-white text-center">Un placer conocerte</h1>
                        <p className="text-white text-center">Estamos deseando que seas parte de la comunidad de Spiced. Vamos a empezar por lo básico.</p>
                    </div>
                    <div className="flex flex-col items-center gap-6 w-full">
                        <p className="tag text-white font-normal text-center">¿Ya eres miembro de Spiced?</p>
                        <Boton texto="Entra" enlace="/login" tamano="grande" jerarquia="secundario" customColor="white" />
                    </div>
                </div>
            </section>

            {/* CAJA PRINCIPAL: */}
            <section className='flex flex-col w-full h-full p-[4rem] pb-[6rem] bg-[var(--gris1)] dark:bg-[var(--gris5)]'>
                <RegistroProvider>
                    {children}
                </RegistroProvider>
            </section>
        </div>
    );
}
