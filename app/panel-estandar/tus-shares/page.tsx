import Image from "next/image";
import Boton from "@/components/buttons/Boton";
import ListaShares from "@/components/layout/panel/ListaShares";
import Input from "@/components/inputs/Input";
import Options from "@/components/inputs/Options";

export default function TusShares() {
    return (
        <div className="w-full flex flex-col gap-12">

            {/* CABECERA: */}
            <div className="w-full flex flex-col gap-8">
                <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                    <h2>Tus shares</h2>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <p>Aquí encontrarás todos los shares que has compartido. Desde aquí podrás consultarlos, editarlos o eliminarlos.</p>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-4">
                {/* Filtros */}
                <div className="w-full flex flex-row justify-end items-center">
                    <Boton texto="Nuevo Share" enlace="/panel-estandar/nuevo-share" tamano="pequeno" jerarquia="primario" />
                </div>

                {/* Tabla */}
                <div className="w-full flex flex-col gap-2 rounded-l">
                    <ListaShares />
                </div>
            </div>

        </div>
    );
}
