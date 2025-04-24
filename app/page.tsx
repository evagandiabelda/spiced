import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import HeroBanner from "@/components/home/HeroBanner";
import BloqueCards from "@/components/home/BloqueCards";
import BloqueTags from "@/components/home/BloqueTags";
import BannerExpertos from "@/components/home/BannerExpertos";
import BloqueColabs from "@/components/home/BloqueColabs";

export const metadata: Metadata = {
  title: 'Inicio',
};

export default async function Inicio() {

  const session = await getServerSession(authOptions);

  return (
    <div className="w-full flex flex-col items-center gap-[80px] pb-[120px] text-center mx-auto">

      {/* BANNER PRINCIPAL: */}
      <HeroBanner />

      {/* BLOQUE 'QUÉ ES SPICED': */}
      <BloqueCards />

      {/* BLOQUE TAGS: */}
      {!session && <BloqueTags />}

      {/* BANNER EXPERTOS: */}
      {!session && <BannerExpertos />}

      {/* BLOQUE COLABORADORES: */}
      <BloqueColabs />

    </div>
  );
}
