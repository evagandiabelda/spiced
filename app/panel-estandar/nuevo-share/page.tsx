import { Metadata } from "next";
import { Suspense } from "react";
import NuevoShareForm from "@/components/inputs/forms/nuevo-share-form";

export const metadata: Metadata = {
    title: 'Nuevo Share',
};

export default function NuevoShare() {
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <div className="w-full flex flex-col gap-16">
                <div className="w-full flex flex-col gap-8 border-b border-b-1 border-b-[var(--gris3)] pb-16">
                    <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                        <h2>Nuevo Share</h2>
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <p>¿Tienes algo maravilloso que compartir con la comunidad de Spiced? Adelante, utiliza este editor para crear un nuevo Share.</p>
                    </div>
                </div>
                <div className="w-full">
                    <NuevoShareForm />
                </div>
            </div>
        </Suspense>
    );
}

export const dynamic = "force-dynamic";
