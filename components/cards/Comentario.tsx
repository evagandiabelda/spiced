"use client";

import Avatar from "@/components/icons/Avatar";
import Boton from "@/components/buttons/Boton";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ComentarioProps {
    texto: string;
    fecha: Date;
    user: {
        name: string;
        foto: string;
        usuario_verificado: boolean;
    };
    sessionUserId: string | null;
}

export default function Comentario({ texto, fecha, user, sessionUserId }: ComentarioProps) {

    const fechaFormateada = format(new Date(fecha), "HH:mm'h' - d 'de' MMMM yyyy", { locale: es });

    return (
        <div className="w-full flex flex-col gap-6 p-[10px] pb-10 border-b border-gray-300">

            {/* Caja Superior: */}
            <div className="w-full flex flex-row justify-between items-center gap-4">
                <div className="flex flex-row items-center gap-2">
                    <div className="max-w-[40px]">
                        <a href="#"><Avatar borde="color" foto={user.foto} /></a>
                    </div>
                    <p className="font-bold text-[0.9rem] text-[var(--gris4)]">@{user.name}</p>
                </div>
                <p className="text-end text-[0.9rem] text-[var(--gris2)] font-bold">{fechaFormateada}</p>
            </div>

            {/* Caja Central: */}
            <div className="w-full">
                <p>{texto}</p>
            </div>

            {/* Caja Inferior: */}
            <div className="w-full flex flex-row justify-between items-center gap-4">
                <a href="#" className="text-end text-[0.9rem] font-bold underline text-[var(--gris2)] hover:text-[var(--gris4)] transition ease">Denunciar contenido inapropiado</a>
                {sessionUserId && <Boton
                    texto="Responder"
                    tamano="pequeno"
                    jerarquia="secundario"
                />}
            </div>

        </div>
    );
}
