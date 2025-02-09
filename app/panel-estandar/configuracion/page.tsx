"use client";

import { Suspense } from "react";
import ConfigUserForm from "@/components/inputs/forms/config-user-form";

export default function Configuracion() {
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <div className="w-full flex flex-col gap-16">
                <div className="w-full flex flex-col gap-8">
                    <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                        <h2>Configuración</h2>
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <p>Utiliza estas herramientas para editar la información de tu cuenta. Recuerda anotar estos datos en un lugar seguro para no perder tu acceso a Spiced.</p>
                    </div>
                </div>
                <div className="w-full">
                    <ConfigUserForm />
                </div>
            </div>
        </Suspense>
    );
}

export const dynamic = "force-dynamic";
