'use client';

import NubeTags from "@/components/buttons/NubeTags";

export default function BloqueTags() {
    return (
        <div className="w-full flex flex-col items-center mobile:px-col1 tablet:px-col2 gap-12">
            <div className="w-full flex flex-col items-center gap-8">
                <h1>Veamos qué te interesa</h1>
                <p>Descubre contenido basado en tu condición. Puedes seleccionar una o varias etiquetas para empezar a componer tu tablero de intereses.</p>
            </div>
            <div className="w-full">
                <NubeTags />
            </div>
        </div>
    );
}
