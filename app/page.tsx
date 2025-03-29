import HeroBanner from "@/components/home/HeroBanner";
import Image from "next/image";
import CardHome from "@/components/cards/CardHome";
import NubeTags from "@/components/buttons/NubeTags";
import BannerExpertos from "@/components/home/BannerExpertos";

export default function Inicio() {
  return (
    <div className="w-full flex flex-col items-center gap-[80px] pb-[120px] text-center mx-auto">

      {/* BANNER PRINCIPAL: */}
      <HeroBanner />

      {/* BLOQUE 'QUÉ ES SPICED': */}
      <div className="w-full flex flex-col items-center mobile:px-col1 tablet:px-col2 laptop:px-col1 gap-12">
        <div className="w-full flex flex-col items-center gap-8 px-col1">
          <Image
            src="/iconos/iconos-genericos/icono-spiced.svg"
            alt="icono Spiced"
            width="50"
            height="50"
          />
          <h1>¿Qué es Spiced?</h1>
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

      {/* BLOQUE TAGS: */}
      <div className="w-full flex flex-col items-center mobile:px-col1 tablet:px-col2 gap-12">
        <div className="w-full flex flex-col items-center gap-8">
          <h1>Veamos qué te interesa</h1>
          <p>Descubre contenido basado en tu condición. Puedes seleccionar una o varias etiquetas para empezar a componer tu tablero de intereses.</p>
        </div>
        <div className="w-full">
          <NubeTags />
        </div>
      </div>

      {/* BANNER EXPERTOS: */}
      <BannerExpertos />

      {/* BLOQUE COLABORADORES: */}
      <div className="w-full flex flex-col items-center px-col1 gap-8">
        <div className="w-full border-b border-b-[var(--gris5)] py-8">
          <h3>Conoce a nuestros colaboradores</h3>
        </div>
        <div className="w-full flex mobile:flex-col tablet:flex-row justify-center items-center gap-10">
          <a href="https://consaludmental.org/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/logos/logos-colaboradores/logo-confederacion-salud-mental.png"
              alt="icono Spiced"
              width="180"
              height="90"
            />
          </a>
          <a href="https://www.fundacionmanantial.org/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/logos/logos-colaboradores/logo-fundacion-manantial.png"
              alt="icono Spiced"
              width="180"
              height="90"
            />
          </a>
          <a href="https://aen.es/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/logos/logos-colaboradores/logo-aen.png"
              alt="icono Spiced"
              width="90"
              height="90"
            />
          </a>
          <a href="https://www.iasp.info/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/logos/logos-colaboradores/logo-iasp.png"
              alt="icono Spiced"
              width="180"
              height="90"
            />
          </a>
        </div>
      </div>

    </div>

  );
}
