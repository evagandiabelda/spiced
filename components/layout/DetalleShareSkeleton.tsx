"use client";

import Image from "next/image";

export function DetalleShareSkeleton() {

    return (
        <div className="w-full flex flex-col items-center gap-16 pb-[160px]">

            {/* CABECERA */}
            <div className="w-full min-h-[500px] max-h-[600px] flex mobile:flex-col laptop:flex-row">
                <div className="relative mobile:w-full laptop:w-2/3 mobile:h-[400px] laptop:h-full bg-[var(--gris2)] opacity-30">

                </div>

                <div className="w-full h-full flex flex-col justify-center gap-8 mobile:p-col1 tablet:p-20 bg-black/5 dark:bg-white/5">
                    <div className="flex flex-row gap-4 items-center">
                        <Image
                            src="/iconos/iconos-genericos/icono-spiced.svg"
                            alt="miniatura"
                            width={15}
                            height={15}
                            className="object-cover filter grayscale opacity-30"
                        />
                        <div className="w-1/2 h-4 rounded-xl bg-[var(--gris2)] opacity-30"></div>
                    </div>
                    <div className="w-full h-8 rounded-xl bg-[var(--gris2)] opacity-30"></div>
                </div>
            </div>

        </div>
    );

}