import { Metadata } from "next";
import Boton from "@/components/buttons/Boton";
import ListaSharesGuardados from "@/components/layout/panel/ListaSharesGuardados";

export const metadata: Metadata = {
    title: 'Shares guardados',
};

export default function SharesGuardados() {
    return (
        <div className="w-full flex flex-col gap-12">

            {/* CABECERA: */}
            <div className="w-full flex flex-col gap-8 border-b border-b-1 border-b-[var(--gris3)] pb-16">
                <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                    <h2>Shares guardados</h2>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <p>Esta es tu biblioteca de Shares de otros usuarios. En ella podrás volver a consultar la información que guardaste o borrarla de la lista si ya no la necesitas.</p>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-6">
                {/* Tabla */}
                <div className="w-full flex flex-col gap-2 rounded-l">
                    <ListaSharesGuardados />
                </div>
            </div>

        </div>
    );
}
