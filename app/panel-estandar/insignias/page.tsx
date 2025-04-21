import { Metadata } from "next";
import Insignias from "@/components/cards/Insignias";

export const metadata: Metadata = {
    title: 'Insignias',
};

export default function SharesGuardados() {
    return (
        <div className="w-full flex flex-col gap-12">

            {/* CABECERA: */}
            <div className="w-full flex flex-col gap-8 border-b border-b-1 border-b-[var(--gris3)] pb-16">
                <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                    <h2 className="dark:text-[var(--gris3)]">Insignias</h2>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <p className="dark:text-[var(--gris3)]">Consigue nuevos logros compartiendo contenido de calidad con la comunidad de Spiced. Tu nueva insignia aparecerá visible para el resto de usuarios junto a tu nombre.</p>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-6 laptop:px-12">
                <Insignias />
            </div>

        </div>
    );
}
