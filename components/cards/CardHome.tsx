'use client';

import Image from "next/image";

interface CardHomeProps {
    icono: string;
    titulo: string;
    parrafo: string;
}

export default function CardHome({ icono, titulo, parrafo }: CardHomeProps) {
    let className = "flex flex-col justify-center items-center gap-6 px-[32px] py-[60px] rounded rounded-[10px] text-center bg-cover bg-center ";

    if (titulo === "Guías y Consejos") {
        className += "bg-[url('/imgs/img-cat-1.webp')]";
    }
    else if (titulo === "Sugerencias") {
        className += "bg-[url('/imgs/img-cat-2.webp')]";
    }
    else if (titulo === "Comunidad") {
        className += "bg-[url('/imgs/img-cat-3.webp')]";
    }

    return (
        <div className={className}>
            <Image
                src={icono}
                alt="icono"
                width="40"
                height="40"
            />
            <h2 className="text-[var(--gris5)]">{titulo}</h2>
            <p className="text-[var(--gris5)]">{parrafo}</p>
            {/* NO se usa el componente "Boton" para el siguiente botón, ya que se requiere personalización avanzada: */}
            <div className="inline-block">
                <a href="/feed" className="inline-block gap-4 text-center font-semibold rounded-full border-2 hover:scale-[1.02] transition ease duration-300 cursor-pointer a-boton-gr px-[1.8rem] py-[0.4rem] text-[var(--blanco)] border-[var(--gris5)] bg-[var(--gris5)]">
                    <div className="flex flex-row justify-center gap-4">
                        Explorar
                    </div>
                </a>
            </div>
        </div>
    );
}
