"use client";

import { useState } from "react";
import Image from "next/image";

export default function ValoracionEstrellas({ onChange }: { onChange: (valor: number) => void }) {

    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);

    const handleClick = (valor: number) => {
        setRating(valor);
        onChange(valor);
    }

    return (

        <div className="w-full flex justify-center gap-6">
            {[1, 2, 3, 4, 5].map((estrella) => (
                <button
                    key={estrella}
                    type="button"
                    onClick={() => handleClick(estrella)}
                    onMouseEnter={() => setHovered(estrella)}
                    onMouseLeave={() => setHovered(0)}
                >
                    <Image
                        src="/iconos/iconos-otros/icono-estrella.svg"
                        alt="icono estrella"
                        width={40}
                        height={40}
                        className={`transition-colors ${(hovered || rating) >= estrella ? "" : "grayscale dark:opacity-20"}`}
                    />
                </button>
            ))}
        </div>

    );

}