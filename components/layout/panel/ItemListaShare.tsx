"use client";

import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface ItemProps {
    id: string;
    imagen: string;
    user?: string | null; // Permitir que usuario sea opcional y pueda ser null
    titulo: string;
    fecha: string;
    onDelete: (id: string) => void;
}

const ItemListaShare = ({ id, imagen, user = "Usuario desconocido", titulo, fecha, onDelete }: ItemProps) => {

    return (
        <li className="w-full flex flex-row justify-between items-center gap-12 py-4 border-b border-b-[var(--gris2)] dark:border-b-[var(--gris5)]">

            <div className="flex-1 flex flex-row mobile:items-start tablet:items-center gap-4">

                <div id="caja-miniatura" className="relative w-[3rem] h-[3rem]">
                    <Image
                        src={imagen}
                        alt="miniatura"
                        fill
                        className="object-cover"
                    />
                </div>

                <div id="caja-textos" className="flex-1 flex flex-col justify-between gap-1">
                    <div className="w-full flex flex-row">
                        <p className="font-bold">{titulo}</p>
                    </div>
                    <div className="w-full mobile:hidden tablet:flex flex-row justify-between">
                        <p><span className="text-[var(--gris3)]">{user || "Usuario desconocido"}</span></p>
                        <p><span className="text-[var(--gris3)]">{fecha}</span></p>
                    </div>
                </div>

            </div>

            <div id="caja-boton" className="mobile:hidden laptop:flex flex-row gap-4">
                <Boton texto="Leer de nuevo" enlace="#" tamano="pequeno" jerarquia="secundario" />
                <Boton texto="Eliminar" enlace="#" tamano="pequeno" jerarquia="secundario" customColor="var(--brand1)" onClick={() => onDelete(id)} />
            </div>

        </li>
    );
};

export default ItemListaShare;
