'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Tag from "@/components/buttons/Tag";

const NubeTagsDinamica = () => {
    const [activeTags, setActiveTags] = useState<string[]>([]);

    // Manejar la selección/deselección de tags:
    const handleTagClick = (tag: string) => {
        setActiveTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    return (
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
    );
};

export default NubeTagsDinamica;
