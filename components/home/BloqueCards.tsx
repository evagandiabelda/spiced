'use client';

import Image from "next/image";
import CardHome from "@/components/cards/CardHome";

export default function BloqueCards() {
    return (
        <div className="w-full flex flex-col items-center mobile:px-col1 tablet:px-col2 laptop:px-col1 gap-12">
            <div className="w-full flex flex-col items-center gap-8 px-col1">
                <Image
                    src="/iconos/iconos-genericos/icono-spiced.svg"
                    alt="icono Spiced"
                    width="40"
                    height="40"
                />
                <h1 className="dark:text-[var(--gris3)]">¿Qué es Spiced?</h1>
                <p>Somos una comunidad creada por neurodivergentes y para neurodivergentes. Spiced es un espacio abierto y diverso donde compartir contenido y aprender, pero también un lugar donde divertirse y aceptar ese toque especial que nos hace tan únicos.</p>
            </div>
            <div className="w-full flex mobile:flex-col laptop:flex-row justify-stretch items-stretch gap-8">
                <CardHome
                    icono="/iconos/iconos-otros/icono-cat-1.svg"
                    titulo="Guías y Consejos"
                    parrafo="Encuentra trucos, consejos y tutoriales para tu día a día."
                />
                <CardHome
                    icono="/iconos/iconos-otros/icono-cat-2.svg"
                    titulo="Sugerencias"
                    parrafo="Descubre libros, podcasts, películas, documentales y mucho más."
                />
                <CardHome
                    icono="/iconos/iconos-otros/icono-cat-3.svg"
                    titulo="Comunidad"
                    parrafo="Comparte tus reflexiones y participa en debates con otros miembros."
                />
            </div>
        </div>
    );
}
