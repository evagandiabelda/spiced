import { Metadata } from "next";
import Boton from "@/components/buttons/Boton";
import ListaSharesVerificados from "@/components/layout/panel/ListaSharesVerificados";

export const metadata: Metadata = {
    title: 'Verificaciones',
};

export default function Sesiones() {
    return (
        <div className="w-full flex flex-col gap-12">

            {/* CABECERA: */}
            <div className="w-full flex flex-col gap-8 border-b border-b-1 border-b-[var(--gris3)] pb-16">
                <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                    <h2>Tus verificaciones</h2>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <p>Contribuye a la comunidad de Spiced verificando contenido de otros usuarios.</p>
                    <p>Antes de verificar un Share, recuerda asegurarte bien de que toda la información que contiene es cierta antes de asignarle tu verificación.</p>
                    <p>Tus verificaciones serán anónimas para el resto de usuarios, pero los moderadores de Spiced sí tendrán acceso a esta información.</p>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-6">
                {/* Filtros */}
                <div className="w-full flex flex-row justify-end items-center pr-4">
                    <Boton texto="Nuevo Share" enlace="/panel-estandar/nuevo-share" tamano="grande" jerarquia="primario" icon="/iconos/iconos-menu/icono-nuevo.svg" />
                </div>

                {/* Tabla */}
                <div className="w-full flex flex-col gap-2 rounded-l">
                    <ListaSharesVerificados />
                </div>
            </div>

        </div>
    );
}
