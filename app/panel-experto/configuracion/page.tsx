import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Configuración',
};

export default function Configuracion() {
    return (
        <h2>Configuración</h2>
    );
}

export const dynamic = "force-dynamic";