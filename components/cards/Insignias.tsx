"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { Insignia } from "@prisma/client";

export default function Insignias() {

    const { data: session } = useSession();

    const divClassname = "w-full flex flex-col gap-4 p-6 mobile:bg-white mobile:rounded-xl mobile:shadow-lg";
    const divClassnameOpacity = divClassname + " opacity-50 grayscale";

    return (
        <div className="w-full flex mobile:flex-col tablet:flex-row tablet:justify-between gap-8">

            {/* INSIGNIA 1: */}

            <div className={divClassname}>
                <div className="w-full flex flex-col items-center text-center gap-4 border-b border-b-1 border-[var(--gris5)] pb-4">
                    <Image
                        src="/iconos/iconos-otros/icono-insignia-1.svg"
                        alt="Insignia 1"
                        width={100}
                        height={100}
                        className="w-full h-auto mobile:px-20 tablet:px-12"
                    />
                    <h3>Pequeño Saltamontes</h3>
                </div>
                <div className="w-full flex flex-col items-center gap-4 p-3">
                    <div className="w-full flex flex-row item-center gap-3">
                        <Image
                            src="/iconos/iconos-otros/icono-tick-lista.svg"
                            alt="Insignia 1"
                            width={14}
                            height={14}
                        />
                        <p>Has creado una cuenta</p>
                    </div>
                    <div className="w-full flex flex-row item-center gap-3">
                        <Image
                            src="/iconos/iconos-otros/icono-tick-lista.svg"
                            alt="Insignia 1"
                            width={14}
                            height={14}
                        />
                        <p>Has definido tus Spices</p>
                    </div>
                    <div className="w-full flex flex-row item-center gap-3">
                        <Image
                            src="/iconos/iconos-otros/icono-tick-lista.svg"
                            alt="Insignia 1"
                            width={14}
                            height={14}
                        />
                        <p>Has personalizado tu Feed</p>
                    </div>
                </div>
            </div>

            {/* INSIGNIA 2: */}

            <div className={(session?.user.insignia === "cacahuete_sabio" || session?.user.insignia === "cactus_legendario") ? divClassname : divClassnameOpacity}>
                <div className="w-full flex flex-col items-center text-center gap-4 border-b border-b-1 border-[var(--gris5)] pb-4">
                    <Image
                        src="/iconos/iconos-otros/icono-insignia-2.svg"
                        alt="Insignia 1"
                        width={100}
                        height={100}
                        className="w-full h-auto mobile:px-20 tablet:px-12"
                    />
                    <h3>Cacahuete Sabio</h3>
                </div>
                <div className="w-full flex flex-col items-center gap-4 p-3">
                    <div className="w-full flex flex-row item-center gap-3">
                        <Image
                            src="/iconos/iconos-otros/icono-tick-lista.svg"
                            alt="Insignia 1"
                            width={14}
                            height={14}
                        />
                        <p>Has publicado 5 Shares</p>
                    </div>
                    <div className="w-full flex flex-row item-center gap-3">
                        <Image
                            src="/iconos/iconos-otros/icono-tick-lista.svg"
                            alt="Insignia 1"
                            width={14}
                            height={14}
                        />
                        <p>Has conseguido 10 comentarios en tus Shares</p>
                    </div>
                    <div className="w-full flex flex-row item-center gap-3">
                        <Image
                            src="/iconos/iconos-otros/icono-tick-lista.svg"
                            alt="Insignia 1"
                            width={14}
                            height={14}
                        />
                        <p>Tus Shares se han guardado 3 veces</p>
                    </div>
                </div>
            </div>

            {/* INSIGNIA 3: */}

            <div className={session?.user.insignia === "cactus_legendario" ? divClassname : divClassnameOpacity}>
                <div className="w-full flex flex-col items-center text-center gap-4 border-b border-b-1 border-[var(--gris5)] pb-4">
                    <Image
                        src="/iconos/iconos-otros/icono-insignia-3.svg"
                        alt="Insignia 1"
                        width={100}
                        height={100}
                        className="w-full h-auto mobile:px-20 tablet:px-12"
                    />
                    <h3>Cactus Legendario</h3>
                </div>
                <div className="w-full flex flex-col items-center gap-4 p-3">
                    <div className="w-full flex flex-row item-center gap-3">
                        <Image
                            src="/iconos/iconos-otros/icono-tick-lista.svg"
                            alt="Insignia 1"
                            width={14}
                            height={14}
                        />
                        <p>Tienes 10 Shares verificados</p>
                    </div>
                    <div className="w-full flex flex-row item-center gap-3">
                        <Image
                            src="/iconos/iconos-otros/icono-tick-lista.svg"
                            alt="Insignia 1"
                            width={14}
                            height={14}
                        />
                        <p>Has conseguido 50 comentarios en tus Shares</p>
                    </div>
                    <div className="w-full flex flex-row item-center gap-3">
                        <Image
                            src="/iconos/iconos-otros/icono-tick-lista.svg"
                            alt="Insignia 1"
                            width={14}
                            height={14}
                        />
                        <p>Tus Shares se han guardado 20 veces</p>
                    </div>
                </div>
            </div>

        </div>
    )

}