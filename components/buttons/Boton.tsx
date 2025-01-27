'use client';

interface BotonProps {
    texto: string;
    enlace: string;
    tamano: "pequeno" | "grande";
    jerarquia: "primario" | "secundario" | string /* Color personalizado */;
}

const Boton = ({ texto, enlace, tamano, jerarquia }: BotonProps) => {

    let className = "inline-block text-center font-semibold rounded-full border-2 transition duration-300 hover-opacity ";
    let style = "";

    if (tamano === "pequeno") {
        className += "a-boton-pq px-[1rem] py-[0.2rem] ";
    }
    else if (tamano === "grande") {
        className += "a-boton-gr px-[1.2rem] py-[0.4rem] ";
    }

    if (jerarquia === "primario") {
        className += "text-[var(--blanco)] dark:text-[var(--gris5)] border-[var(--gris5)] dark:border-[var(--brand2)] bg-[var(--gris5)] dark:bg-[var(--brand2)] ";
    }
    else if (jerarquia === "secundario") {
        className += "text-[var(--gris5)] dark:text-[var(--gris1)] border-[var(--gris5)] dark:border-[var(--brand2)] hover:bg-black/10 dark:hover:bg-white/10 ";
    }
    else { /* Color personalizado: */
        className += `text-[var(--gris5)] border-[${jerarquia}]`;
        style += jerarquia; /* S'utilitza 'style' perquè no permet definir un 'bg-' dinàmic. */
    }

    return (
        <a
            href={enlace}
            className={`${className}`}
            style={{ backgroundColor: style }}
        >
            {texto}
        </a>
    );
};

export default Boton;
