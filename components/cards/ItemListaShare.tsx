'use client';

import Image from "next/image";
import Boton from "@/components/buttons/Boton";

const ItemListaShare = () => {
    return (
        <div className="w-full mobile:max-h-[100px] tablet:max-h-[50px] flex flex-row justify-between items-center gap-12 mobile:pt-4 tablet:pt-0 pb-8 border-b border-b-[var(--gris2)] dark:border-b-[var(--gris5)]">

            <div className="flex-1 flex flex-row mobile:items-start tablet:items-center gap-4">

                <div id="caja-miniatura">
                    <Image
                        src="/imgs/IMG-Ejemplo-Miniatura.png"
                        width={50}
                        height={50}
                        alt="miniatura"
                    />
                </div>

                <div id="caja-textos" className="flex-1 flex flex-col justify-between gap-1">
                    <div className="w-full flex flex-row">
                        <p className="font-bold">Características del TDAH en adultos</p>
                    </div>
                    <div className="w-full mobile:hidden tablet:flex flex-row justify-between">
                        <p><span className="text-[var(--gris3)]">@susana_tda</span></p>
                        <p><span className="text-[var(--gris3)]">Guardado hace 2 horas</span></p>
                    </div>
                </div>

            </div>

            <div id="caja-boton" className="mobile:hidden laptop:block">
                <Boton texto="Leer de nuevo" enlace="#" tamano="grande" jerarquia="secundario" />
            </div>

        </div>
    );
};

export default ItemListaShare;
