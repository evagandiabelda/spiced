import { Metadata } from "next";
import { Suspense } from "react";
import DetalleShare from "@/components/layout/DetalleShare";

export const metadata: Metadata = {
    title: 'Share',
};

export default function NuevoShare() {
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <DetalleShare />
        </Suspense>
    );
}
