"use client";

import Image from "next/image";

export default function Estadisticas() {
    return (
        <div className="min-w-col3 flex flex-col justify-between rounded-xl p-[30px] bg-[var(--tdah)] dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--tdah)]">
            <div id="caja-sup" className="w-full h-full flex flex-row pb-6 border-b border-[var(--negro)]">
                <div className="w-full h-100">
                    <a href="/panel-estandar/nuevo-share">
                        <div className="flex flex-row gap-2 items-center hover:scale-105 transition ease">
                            <Image
                                src="/iconos/iconos-otros/icono-agregar.svg"
                                width={28}
                                height={28}
                                alt="nuevo share"
                            />
                            <p className="font-bold">Nuevo share</p>
                        </div>
                    </a>
                </div>
                <div className="h-full flex flex-col justify-end">
                    <a href="/panel-estandar/tus-shares">
                        <div className="w-full h-100 flex flex-col justify-end items-right gap-6">
                            <p className="font-bold text-[4rem] text-right">12</p>
                            <p className="text-[1.2rem] font-bold text-right">shares publicados</p>
                        </div>
                    </a>
                </div>
            </div>
            <div id="caja-inf" className="w-full h-[100px] flex flex-row justify-between pt-6">
                <div className="w-full h-100 flex flex-col justify-end">
                    <a href="/panel-estandar/shares-guardados"><p className="text-[0.9rem] font-bold">27 guardados</p></a>
                </div>
                <div className="w-full h-100 flex flex-col justify-end">
                    <p className="text-[0.9rem] font-bold text-right">0 comentarios</p>
                </div>
            </div>
        </div>
    )
}