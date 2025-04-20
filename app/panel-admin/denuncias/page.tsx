"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Denuncias() {

    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // Redirigir si no está autenticado
        }
    }, [status, router]);


    return (
        <div className="w-full flex flex-col gap-10">

            {/* CABECERA: */}
            <div className="w-full flex flex-col gap-8">
                <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                    <h2>Denuncias</h2>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-6">

            </div>

        </div>
    );
}
