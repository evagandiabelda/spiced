'use client';

import Image from "next/image";

interface TagProps {
    nombre: string;
    tamano: "pequeno" | "grande";
    isActive?: boolean;
    icon?: boolean;
    mode?: "static" | "toggle" | "filter";
    onClick?: (nombre: string) => void;
}

const Tag = ({ nombre, tamano, isActive = false, icon = false, mode = "static", onClick }: TagProps) => {
    let texto = "";
    let className = `inline-block gap-4 text-center font-semibold rounded-full border-2 hover:scale-[1.03] transition ease duration-300 cursor-pointer `;
    let backgroundColor = "bg-[var(--gris2)] "; // Color por defecto inactivo.

    const etiquetas = {
        TEA: "T. del Espectro Autista",
        TDAH: "T. por Déficit de Atención e Hiperactividad",
        TOC: "T. Obsesivo Compulsivo",
        TLP: "T. Límite de la Personalidad",
        TAG: "T. de Ansiedad Generalizada",
        TP: "T. de Pánico",
        TPA: "T. de Personalidad Antisocial",
        TB: "T. Bipolar",
        TEP: "T. de Estrés Postraumático",
        TD: "T. Depresivo",
        TE: "T. Esquizofrénico",
        TA: "T. Alimentarios",
        ADI: "Adicciones",
        FOB: "Fobias",
        OTR: "Otros"
    }

    if (tamano === "pequeno") {
        texto = nombre.toUpperCase();
        className += "tag-pq px-[0.8rem] py-[0.1rem] ";
    } else if (tamano === "grande") {
        texto = etiquetas[nombre as keyof typeof etiquetas];
        className += "tag-gr px-[1rem] py-[0.2rem] ";
    }

    // El color de fondo se especifica litealmente para cada caso, ya que Tailwind no lo reconoce si se hace dinámicamente.

    switch (nombre.toUpperCase()) {

        case "TEA":
            if (isActive) { backgroundColor = "bg-[var(--tea)] "; }
            backgroundColor += "hover:bg-[var(--tea)]";
            break;
        case "TDAH":
            if (isActive) { backgroundColor = "bg-[var(--tdah)] "; }
            backgroundColor += "hover:bg-[var(--tdah)]";
            break;
        case "TOC":
            if (isActive) { backgroundColor = "bg-[var(--toc)] "; }
            backgroundColor += "hover:bg-[var(--toc)]";
            break;
        case "TLP":
            if (isActive) { backgroundColor = "bg-[var(--tlp)] "; }
            backgroundColor += "hover:bg-[var(--tlp)]";
            break;
        case "TAG":
            if (isActive) { backgroundColor = "bg-[var(--tag)] "; }
            backgroundColor += "hover:bg-[var(--tag)]";
            break;
        case "TP":
            if (isActive) { backgroundColor = "bg-[var(--tp)] "; }
            backgroundColor += "hover:bg-[var(--tp)]";
            break;
        case "TPA":
            if (isActive) { backgroundColor = "bg-[var(--tpa)] "; }
            backgroundColor += "hover:bg-[var(--tpa)]";
            break;
        case "TB":
            if (isActive) { backgroundColor = "bg-[var(--tb)] "; }
            backgroundColor += "hover:bg-[var(--tb)]";
            break;
        case "TEP":
            if (isActive) { backgroundColor = "bg-[var(--tep)] "; }
            backgroundColor += "hover:bg-[var(--tep)]";
            break;
        case "TD":
            if (isActive) { backgroundColor = "bg-[var(--td)] "; }
            backgroundColor += "hover:bg-[var(--td)]";
            break;
        case "TE":
            if (isActive) { backgroundColor = "bg-[var(--te)] "; }
            backgroundColor += "hover:bg-[var(--te)]";
            break;
        case "TA":
            if (isActive) { backgroundColor = "bg-[var(--ta)] "; }
            backgroundColor += "hover:bg-[var(--ta)]";
            break;
        case "ADI":
            if (isActive) { backgroundColor = "bg-[var(--adi)] "; }
            backgroundColor += "hover:bg-[var(--adi)]";
            break;
        case "FOB":
            if (isActive) { backgroundColor = "bg-[var(--fob)] "; }
            backgroundColor += "hover:bg-[var(--fob)]";
            break;
        case "OTR":
            if (isActive) { backgroundColor = "bg-[var(--otr)] "; }
            backgroundColor += "hover:bg-[var(--otr)]";
            break;

    }

    className += backgroundColor;

    return (
        <div className="inline-block">
            <a
                className={className}
                onClick={() => {
                    if (mode !== "static" && onClick) {
                        onClick(nombre);
                    }
                }}
            >
                <div className="flex flex-row justify-center gap-2">
                    {texto}
                    {icon && <Image src="/iconos/iconos-otros/icono-cruz.svg" alt="icono" width={10} height={10} />}
                </div>
            </a>
        </div>
    );
};

export default Tag;
