'use client';

interface BotonProps {
    texto: string;
    enlace: string;
    tamano: "pequeno" | "grande";
    jerarquia: "primario" | "secundario";
    customColor?: string; /* Color personalizado */
}

const Boton = ({ texto, enlace, tamano, jerarquia, customColor }: BotonProps) => {
    let className = "inline-block text-center font-semibold rounded-full border-2 transition ease duration-300 ";
    let style: React.CSSProperties = {};

    if (tamano === "pequeno") {
        className += "a-boton-pq px-[1rem] py-[0.2rem] ";
    } else if (tamano === "grande") {
        className += "a-boton-gr px-[1.8rem] py-[0.4rem] ";
    }

    if (jerarquia === "primario") {

        className += "text-[var(--blanco)] dark:text-[var(--gris5)] hover:opacity-80 ";

        if (customColor) {
            style = { backgroundColor: customColor, borderColor: customColor };
        } else {
            className += "border-[var(--gris5)] dark:border-[var(--brand2)] bg-[var(--gris5)] dark:bg-[var(--brand2)] ";
        }

    } else if (jerarquia === "secundario") {

        className += "hover:bg-black/10 dark:hover:bg-white/10 ";

        if (customColor) {
            style = { color: customColor, borderColor: customColor };
        } else {
            className += "text-[var(--gris5)] dark:text-[var(--gris2)] border-[var(--gris5)] dark:border-[var(--gris2)] ";
        }

    }

    return (
        <a href={enlace} className={className} style={style}>
            {texto}
        </a>
    );
};

export default Boton;
