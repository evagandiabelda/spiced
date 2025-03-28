'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Tag from "@/components/buttons/Tag";
import BotonSubmit from "./BotonSubmit";

const NubeTags = () => {
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const router = useRouter();

    // Manejar la selección/deselección de tags:
    const handleTagClick = (tag: string) => {
        setActiveTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    // Guardar los tags en localStorage y redirigir al usuario al registro:
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("selectedTags", JSON.stringify(activeTags));
        router.push("/register");
    };

    // Cargar los tags guardados en localStorage al montar el componente:
    useEffect(() => {
        const storedTags = localStorage.getItem("selectedTags");
        if (storedTags) {
            setActiveTags(JSON.parse(storedTags));
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
            <div className="flex gap-2 flex-wrap justify-center">
                {["TEA", "TDAH", "TOC", "TLP", "TAG", "TP", "TPA", "TB", "TEP", "TD", "TE", "TA", "ADI", "FOB", "OTR"].map((tag) => (
                    <Tag
                        key={tag}
                        nombre={tag}
                        tamano="grande"
                        mode="toggle"
                        isActive={activeTags.includes(tag)}
                        onClick={handleTagClick}
                    />
                ))}
            </div>

            <BotonSubmit
                texto="¡Empecemos!"
            />
        </form>
    );
};

export default NubeTags;
