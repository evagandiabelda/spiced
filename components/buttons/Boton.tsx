'use client';

import Image from "next/image";

interface BotonProps {
    texto: string;
    enlace?: string;
    tamano: "pequeno" | "grande";
    jerarquia: "primario" | "secundario";
    icon?: string;
    customColor?: string; /* Color personalizado */
    onClick?: () => void;
    deshabilitado?: boolean;
    nuevaPestana?: boolean;
}

export default function Boton({ texto, enlace, tamano, jerarquia, icon, customColor, onClick, deshabilitado, nuevaPestana }: BotonProps) {
    let className = "inline-block gap-4 text-center font-semibold rounded-full border-2 hover:scale-[1.01] transition ease duration-300 cursor-pointer ";
    let style: React.CSSProperties = {};
    let iconClassName = ""

    if (tamano === "pequeno") {
        className += "a-boton-pq px-[1rem] py-[0.2rem] ";
    } else if (tamano === "grande") {
        className += "a-boton-gr px-[1.8rem] py-[0.4rem] ";
    }

    if (jerarquia === "primario") {

        className += "text-[var(--blanco)] dark:text-[var(--negro)] ";
        iconClassName += "invert dark:filter-none ";

        if (customColor) {
            style = { backgroundColor: customColor, borderColor: customColor };
        } else {
            className += "border-[var(--gris5)] dark:border-[var(--gris3)] dark:hover:border-[var(--gris2)] bg-[var(--gris5)] dark:bg-[var(--gris3)] dark:hover:bg-[var(--gris2)] ";
        }

    } else if (jerarquia === "secundario") {

        className += "hover:bg-black/10 dark:hover:bg-white/10 dark:hover:text-[var(--gris2)] dark:hover:border-[var(--gris2)] ";
        iconClassName += "dark:invert ";

        if (customColor) {
            style = { color: customColor, borderColor: customColor };
        } else {
            className += "text-[var(--gris5)] dark:text-[var(--gris3)] border-[var(--gris5)] dark:border-[var(--gris3)] ";
        }

    }

    if (deshabilitado) {
        className += "opacity-50 cursor-not-allowed pointer-events-none ";
    } else {
        className += "cursor-pointer ";
    }

    return (
        <div className="inline-block">
            <a
                href={enlace}
                target={nuevaPestana ? "_blank" : "_self"}
                rel={nuevaPestana ? "noopener noreferrer" : undefined}
                className={className}
                style={style}
                onClick={onClick}>
                <div className="flex flex-row justify-center gap-4">
                    {icon && <Image src={icon} alt="icono" width={15} height={15} className={iconClassName} />}
                    {texto}
                </div>
            </a>
        </div>
    );
};
