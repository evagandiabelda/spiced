import HeroBanner from "@/components/home/HeroBanner";
import BloqueCards from "@/components/home/BloqueCards";
import BloqueTags from "@/components/home/BloqueTags";
import BannerExpertos from "@/components/home/BannerExpertos";
import BloqueColabs from "@/components/home/BloqueColabs";

export default function Inicio() {
  return (
    <div className="w-full flex flex-col items-center gap-[80px] pb-[120px] text-center mx-auto">

      {/* BANNER PRINCIPAL: */}
      <HeroBanner />

      {/* BLOQUE 'QUÉ ES SPICED': */}
      <BloqueCards />

      {/* BLOQUE TAGS: */}
      <BloqueTags />

      {/* BANNER EXPERTOS: */}
      <BannerExpertos />

      {/* BLOQUE COLABORADORES: */}
      <BloqueColabs />

    </div>
  );
}
