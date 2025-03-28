'use client';

import Image from "next/image";
import Boton from "@/components/buttons/Boton";

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
            <h2>{titulo}</h2>
            <p>{parrafo}</p>
            <Boton
                texto="Explorar"
                enlace="/feed"
                tamano="grande"
                jerarquia="primario"
            />
        </div>
    );
}
