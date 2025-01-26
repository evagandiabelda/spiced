import Image from "next/image"; // Per a optimitzar les imatges.
import Logo from "@/components/icons/Logo";
import Boton from "@/components/buttons/Boton";

export default function Inicio() {
  return (
    <div className="text-center space-y-20">
      <div className="w-[300px] mx-auto">
        <Logo />
      </div>
      <h1 className="text-2xl font-inter font-bold">
        Página en construcción
      </h1>
    </div>
  );
}
