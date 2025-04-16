import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sesiones',
};

export default function Sesiones() {
    return (
        <div className="w-full flex flex-col gap-12">

            {/* CABECERA: */}
            <div className="w-full flex flex-col gap-8 border-b border-b-1 border-b-[var(--gris3)] pb-16">
                <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                    <h2>Sesiones</h2>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <p>Muy pronto podrás gestionar tus propias sesiones terapéuticas desde Spiced. ¡Permanece atent@ a esta sección!</p>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-6">

            </div>

        </div>
    );
}
