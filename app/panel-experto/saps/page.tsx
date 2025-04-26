import { Metadata } from "next";
import ListaSolicitudesAyuda from "@/components/panel/ListaSolicitudesAyuda";

export const metadata: Metadata = {
    title: 'Sistema de Ayuda y Prevención del Suicidio',
};

export default function Saps() {
    return (
        <div className="w-full flex flex-col gap-12">

            {/* CABECERA: */}
            <div className="w-full flex flex-col gap-8 border-b border-b-1 border-b-[var(--gris3)] pb-16">
                <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                    <h2 className="dark:text-[var(--gris3)]">Sistema de Ayuda y Prevención del Suicidio</h2>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <p className="dark:text-[var(--gris3)]">Si un usuario está en una situación de riesgo, puede solicitar hablar con un experto voluntario a través del chat en vivo. Aquí podrás ver todas las solicitudes entrantes y responder a cualquiera de ellas. <strong>Tu ayuda puede salvar vidas.</strong></p>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-6">
                <ListaSolicitudesAyuda />
            </div>

        </div>
    );
}
