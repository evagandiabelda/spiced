import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createPortal } from "react-dom";
import Image from "next/image";
import AvatarPropio from "@/components/icons/AvatarPropio";
import Search from "@/components/inputs/Search";
import Menu from "@/components/layout/Menu";

type DesplegableProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Desplegable({ isOpen, onClose }: DesplegableProps) {

    const { data: session } = useSession();

    // Animación Abrir/Cerrar Menú:
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [animateOut, setAnimateOut] = useState(false);

    // Evitar scroll al obrir el menú:
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setAnimateOut(false);
            document.body.style.overflow = "hidden";
        } else {
            setAnimateOut(true);
            document.body.style.overflow = "";
            const timeout = setTimeout(() => {
                setShouldRender(false);
            }, 300); // duración igual que la animación
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    let href = "/login";
    if (session?.user.userType === "standard") href = "/panel-estandar";
    if (session?.user.userType === "expert") href = "/panel-experto";
    if (session?.user.userType === "admin") href = "/panel-admin";

    return createPortal( // Crea un 'body' paral·lel per a renderitzar el menú desplegable sobre el body principal.
        <div className={`fixed inset-0 z-50 h-dvh flex flex-col justify-between bg-white dark:bg-[var(--gris5)]
        ${animateOut ? "animate-slide-up" : "animate-slide-down"}`}>

            <div>
                <div className="px-[30px] py-[24px] border-y-2 border-[--gris1] dark:border-[--gris4] cursor-pointer">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] dark:hover:bg-[--gris4]">
                        <div className="w-12">
                            <AvatarPropio />
                        </div>
                        <a href={href}><p className="font-bold mb-0">Espacio personal</p></a>
                    </div>
                    <div className="py-3">
                        <Search />
                    </div>
                </div>

                <div className="px-[30px] py-[24px]">
                    <Menu tipo='header-desplegable' />
                </div>
            </div>

            <Image
                src="/iconos/iconos-menu/icono-contraer.svg"
                width={80}
                height={80}
                className="self-end align-bottom cursor-pointer dark:invert dark:opacity-50"
                onClick={onClose}
                alt="contraer menú"
                aria-label="Cerrar menú"
            />
        </div>,
        document.body // Renderiza fuera del DOM del header
    );

};