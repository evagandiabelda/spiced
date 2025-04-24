'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type ItemProps = {
    enlace: string;
    icono: string;
    texto: string;
}

export default function ItemMenuSidebar({ enlace, icono, texto }: ItemProps) {

    // Per a determinar si l'enllaç està actiu:
    const pathname = usePathname();
    const isActive = pathname === enlace;

    return (
        <Link
            key={texto}
            href={enlace}
            className="w-full"
        >
            <div className={`flex mobile:flex-col tablet:flex-row items-center mobile:w-[60px] tablet:w-full mobile:gap-2 tablet:gap-5 mobile:px-0 mobile:py-3 tablet:p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20 dark:opacity-50 dark:hover:opacity-100 
                ${isActive ? "bg-white/20 dark:opacity-100" : ""}`}>
                <img src={icono} alt={texto} className="mobile:h-8 laptop:h-6 invert" />
                <p className="w-full mobile:hidden laptop:block font-bold mb-0 text-white">{texto}</p>
            </div>
        </Link>
    );

};
