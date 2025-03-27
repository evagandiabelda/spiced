'use client';

import Image from "next/image";

interface TagProps {
    nombre: string;
    tamano: "pequeno" | "grande";
    isActive: true | false;
    icon: true | false;
}

const Tag = ({ nombre, tamano, isActive, icon }: TagProps) => {
    let texto = "";
    let className = "inline-block gap-4 text-center font-semibold rounded-full border-2 hover:opacity-70 transition ease duration-300 cursor-pointer ";
    let backgroundColor = "bg-[var(--gris2)]"; // Color por defecto inactivo.

    switch (nombre) {
        case "TEA":
            if (tamano === "pequeno") {
                texto = "TEA";
            } else {
                texto = "T. del Espectro Autista";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--tea)]";
            }
            break;
        case "TDAH":
            if (tamano === "pequeno") {
                texto = "TDAH";
            } else {
                texto = "T. por Déficit de Atención e Hiperactividad";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--tdah)]";
            }
            break;
        case "TOC":
            if (tamano === "pequeno") {
                texto = "TOC";
            } else {
                texto = "T. Obsesivo Compulsivo";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--toc)]";
            }
            break;
        case "TLP":
            if (tamano === "pequeno") {
                texto = "TLP";
            } else {
                texto = "T. Límite de la Personalidad";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--tlp)]";
            }
            break;
        case "TAG":
            if (tamano === "pequeno") {
                texto = "TAG";
            } else {
                texto = "T. de Ansiedad Generalizada";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--tag)]";
            }
            break;
        case "TP":
            if (tamano === "pequeno") {
                texto = "TP";
            } else {
                texto = "T. de Pánico";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--tp)]";
            }
            break;
        case "TPA":
            if (tamano === "pequeno") {
                texto = "TPA";
            } else {
                texto = "T. de Personalidad Antisocial";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--tpa)]";
            }
            break;
        case "TB":
            if (tamano === "pequeno") {
                texto = "TB";
            } else {
                texto = "T. Bipolar";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--tb)]";
            }
            break;
        case "TEP":
            if (tamano === "pequeno") {
                texto = "TEP";
            } else {
                texto = "T. de Estrés Postraumático";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--tep)]";
            }
            break;
        case "TD":
            if (tamano === "pequeno") {
                texto = "TD";
            } else {
                texto = "T. Depresivo";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--td)]";
            }
            break;
        case "TE":
            if (tamano === "pequeno") {
                texto = "TE";
            } else {
                texto = "T. Esquizofrénico";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--te)]";
            }
            break;
        case "TA":
            if (tamano === "pequeno") {
                texto = "TA";
            } else {
                texto = "T. Alimentarios";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--ta)]";
            }
            break;
        case "ADI":
            if (tamano === "pequeno") {
                texto = "ADI";
            } else {
                texto = "Adicciones";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--adi)]";
            }
            break;
        case "FOB":
            if (tamano === "pequeno") {
                texto = "FOB";
            } else {
                texto = "Fobias";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--fob)]";
            }
            break;
        case "OTR":
            if (tamano === "pequeno") {
                texto = "OTR";
            } else {
                texto = "Otros";
            }
            if (isActive) {
                backgroundColor = "bg-[var(--otr)]";
            }
            break;
    }

    if (tamano === "pequeno") {
        className += "tag-pq px-[0.8rem] py-[0.1rem] ";
    } else if (tamano === "grande") {
        className += "tag-gr px-[1rem] py-[0.2rem] ";
    }

    className += backgroundColor;

    return (
        <div className="inline-block">
            <a href="" className={className}>
                <div className="flex flex-row justify-center gap-2">
                    {texto}
                    {icon && <Image src="/iconos/iconos-otros/icono-cruz.svg" alt="icono" width={10} height={10} />}
                </div>
            </a>
        </div>
    );
};

export default Tag;
