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
                <h2>Nuevo Share</h2>
                <NuevoShareForm />
            </div>
        </Suspense>
    );
}

export const dynamic = "force-dynamic";
