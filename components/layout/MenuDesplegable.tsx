import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Avatar from "@/components/icons/Avatar";
import Search from "@/components/inputs/Search";
import Menu from "@/components/layout/Menu";

type DesplegableProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Desplegable = ({ isOpen, onClose }: DesplegableProps) => {
    // Evitar scroll al obrir el menú:
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal( // Crea un 'body' paral·lel per a renderitzar el menú desplegable sobre el body principal.
        <div className="fixed inset-0 bg-[--blanco] z-50 h-screen flex flex-col justify-between">
            <div>
                <div className="px-[30px] py-[24px] border-y-2 border-[--gris1] dark:border-[--gris4] cursor-pointer">
                    <a href="/panel" id="enlace">
                        <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] dark:hover:bg-[--gris4]">
                            <div className="w-12">
                                <Avatar borde="color" />
                            </div>
                            <p className="font-bold mb-0">Espacio personal</p>
                        </div>
                    </a>
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

export default Desplegable;
