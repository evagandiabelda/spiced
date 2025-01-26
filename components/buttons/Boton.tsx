'use client';

interface BotonProps {
    texto: string;
    enlace: string;
    modo: "claro" | "oscuro";
    tamano: "pequeno" | "grande";
    jerarquia: "primario" | "secundario";
    customColor?: string;
}

const Boton = ({ texto, enlace, modo, tamano, jerarquia, customColor }: BotonProps) => {

    let style = {}; // S'usa 'style' perque no reconeix el 'border' com a propietat de 'className'.
    let className = "inline-block text-center font-semibold rounded-full transition duration-300 hover-opacity ";

    if (modo === "claro" && tamano === "pequeno" && jerarquia === "primario") {
        style = { border: "2px solid var(--gris5)" };
        className += "a-boton-pq text-[var(--blanco)] px-[1rem] py-[0.2rem] bg-[var(--gris5)]";
    }

    if (modo === "claro" && tamano === "pequeno" && jerarquia === "secundario") {
        style = { border: "2px solid var(--gris5)" };
        className += "a-boton-pq text-[var(--gris5)] px-[1rem] py-[0.2rem]";
    }

    if (modo === "claro" && tamano === "grande" && jerarquia === "primario") {
        style = { border: "2px solid var(--gris5)" };
        className += "a-boton-gr text-[var(--blanco)] px-[1.1rem] py-[0.4rem] bg-[var(--gris5)]";
    }

    if (modo === "claro" && tamano === "grande" && jerarquia === "secundario") {
        style = { border: "2px solid var(--gris5)" };
        className += "a-boton-gr text-[var(--gris5)] px-[1.1rem] py-[0.4rem]";
    }

    if (modo === "oscuro" && tamano === "pequeno" && jerarquia === "primario") {
        style = { border: "2px solid var(--brand2)" };
        className += "a-boton-pq text-[var(--gris5)] px-[1rem] py-[0.2rem] bg-[var(--brand2)]";
    }

    if (modo === "oscuro" && tamano === "pequeno" && jerarquia === "secundario") {
        style = { border: "2px solid var(--brand2)" };
        className += "a-boton-pq text-[var(--gris1)] px-[1rem] py-[0.2rem]";
    }

    if (modo === "oscuro" && tamano === "grande" && jerarquia === "primario") {
        style = { border: "2px solid var(--brand2)" };
        className += "a-boton-gr text-[var(--gris5)] px-[1.1rem] py-[0.4rem] bg-[var(--brand2)]";
    }

    if (modo === "oscuro" && tamano === "grande" && jerarquia === "secundario") {
        style = { border: "2px solid var(--brand2)" };
        className += "a-boton-gr text-[var(--gris1)] px-[1.1rem] py-[0.4rem]";
    }

    if (customColor) {
        style = { border: `2px solid ${customColor}`, backgroundColor: `${customColor}` };
    }

    return (
        <a
            href={enlace}
            style={style}
            className={`${className}`}
        >
            {texto}
        </a>
    );
};

export default Boton;
