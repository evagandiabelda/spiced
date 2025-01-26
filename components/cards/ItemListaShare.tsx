'use client';

import Boton from "@/components/buttons/Boton";

const ItemListaShare = () => {
    return (
        <div className="w-full max-h-[50px] flex flex-row justify-between items-center gap-12 pb-8 border-b border-b-[var(--gris2)]">

            <div className="flex-1 flex flex-row items-center gap-4">

                <div id="caja-miniatura">
                    <img src="/imgs/IMG-Ejemplo-Miniatura.png" alt="miniatura" className="w-[50px] h-[50px]" />
                </div>

                <div id="caja-textos" className="flex-1 flex flex-row justify-between gap-3">
                    <div className="flex-1 flex flex-col justify-between gap-1">
                        <p className="font-bold">Características del TDAH en adultos</p>
                        <span className="text-[var(--gris3)]">@susana_tda</span>
                    </div>
                    <div className="flex flex-col justify-end">
                        <span className="text-[var(--gris3)]">Guardado hace 2 horas</span>
                    </div>
                </div>

            </div>

            <div id="caja-boton">
                <Boton texto="Leer de nuevo" enlace="#" modo="claro" tamano="grande" jerarquia="secundario" />
            </div>

        </div>
    );
};

export default ItemListaShare;
