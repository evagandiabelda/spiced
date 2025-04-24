'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Tag from "@/components/buttons/Tag";

interface NubeTagsDinamicaProps {
    uso: "feed" | "register";
    defaultActive?: boolean;
    onSeleccionarTags?: (tags: string[]) => void;
    tagsSeleccionados?: string[];
}

export default function NubeTagsDinamica({ uso, defaultActive = false, onSeleccionarTags, tagsSeleccionados }: NubeTagsDinamicaProps) {

    const listaTags = ["TEA", "TDAH", "TOC", "TLP", "TAG", "TP", "TPA", "TB", "TEP", "TD", "TE", "TA", "ADI", "FOB", "OTR"];

    const router = useRouter();

    // Si los tagsSeleccionados son proporcionados, usarlos, si no, iniciar con los tags por defecto
    const [activeTags, setActiveTags] = useState<string[]>(() =>
        tagsSeleccionados ? tagsSeleccionados : defaultActive ? listaTags : []
    );

    // Manejar la selección/deselección de tags:
    const handleTagClick = (tag: string) => {
        const updatedTags = activeTags.includes(tag)
            ? activeTags.filter((t) => t !== tag)
            : [...activeTags, tag];

        setActiveTags(updatedTags);

        if (uso === "feed") {
            router.push(`/explorar?spices=${updatedTags}`);
        }

        if (onSeleccionarTags) onSeleccionarTags(updatedTags);  // Notificar a Feed sobre los cambios
    };

    useEffect(() => {
        if (tagsSeleccionados) {
            setActiveTags(tagsSeleccionados);
        }
    }, [tagsSeleccionados]);

    const estiloFeed = "w-full flex mobile:flex-row tablet:flex-wrap overflow-x-auto scrollbar-hide gap-2 tablet:justify-center mobile:pl-col1 tablet:pl-0";
    const estiloRegister = "w-full flex flex-wrap gap-2 justify-center";

    return (
        <div className={uso === "feed" ? estiloFeed : estiloRegister}>
            {listaTags.map((tag) => (
                <Tag
                    key={tag}
                    nombre={tag}
                    tamano="grande"
                    mode="toggle"
                    isActive={activeTags.includes(tag)}
                    onClick={() => handleTagClick(tag)}
                />
            ))}
        </div>
    );
};
