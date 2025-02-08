import Logo from "@/components/icons/Logo";
import Boton from "@/components/buttons/Boton";

export default function Inicio() {
  return (
    <div className="w-full h-100 flex flex-col justify-center items-center text-center space-y-20 mx-auto">
      <div className="w-[300px] mx-auto">
        <Logo />
      </div>
      <h1 className="text-2xl font-inter font-bold">
        Página en construcción
      </h1>
      <div className="w-full mx-auto">
        <Boton texto="Ir al Panel" enlace="/panel-estandar" tamano="grande" jerarquia="primario" />
      </div>
    </div>
  );
}
