'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


type tipo = {
    // Valores aceptados:
    tipo: "header" | "header-desplegable" | "footer" | "footer-desplegable";
};

const Menu = ({ tipo }: tipo) => {

    const { data: session } = useSession();

    if (tipo === "header") {
        return (
            <nav className="mobile:hidden laptop:flex items-center space-x-6">
                <a href="/" className="hover-underline">Inicio</a>
                <a href="/explorar" className="hover-underline">Explorar</a>
                {session?.user.userType !== "admin" &&
                    <a href={session?.user.userType === "expert" ? "/panel-experto/nuevo-share" : "/panel-estandar/nuevo-share"} className="hover-underline">Compartir</a>
                }
            </nav>
        );
    }

    if (tipo === "header-desplegable") {
        return (
            <nav className="mobile:flex laptop:hidden w-full flex-col gap-2">
                <a href="/" className="w-full">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] dark:hover:bg-[--gris4]">
                        <Image
                            src="/iconos/iconos-menu/icono-inicio.svg"
                            width={24}
                            height={24}
                            className="dark:invert"
                            alt="inicio"
                        />
                        <p className="font-bold mb-0">Inicio</p>
                    </div>
                </a>

                <a href="/explorar">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] dark:hover:bg-[--gris4]">
                        <Image
                            src="/iconos/iconos-menu/icono-explorar.svg"
                            width={24}
                            height={24}
                            className="dark:invert"
                            alt="explorar"
                        />
                        <p className="font-bold mb-0">Explorar</p>
                    </div>
                </a>

                {session?.user.userType !== "admin" &&
                    <a href={session?.user.userType === "expert" ? "/panel-experto/nuevo-share" : "/panel-estandar/nuevo-share"}>
                        <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] dark:hover:bg-[--gris4]">
                            <Image
                                src="/iconos/iconos-menu/icono-compartir.svg"
                                width={24}
                                height={24}
                                className="dark:invert"
                                alt="compartir"
                            />
                            <p className="font-bold mb-0">Compartir</p>
                        </div>
                    </a>
                }
            </nav>
        );
    }

    if (tipo === "footer") {
        const className = "font-normal text-[var(--brand2)] dark:text-[var(--gris3)] hover:text-white dark:hover:text-[var(--gris2)]";

        return (
            <div className="w-full flex mobile:flex-col tablet:flex-row mobile:gap-6 tablet:gap-16">
                <div className="flex flex-col gap-5">
                    <h3 className='text-white dark:text-[var(--gris3)]'>Spices</h3>
                    <div className="flex flex-row gap-6">
                        <nav className="flex flex-col gap-3">
                            <a href="/explorar?spices=TEA" className={className}>TEA</a>
                            <a href="/explorar?spices=TDAH" className={className}>TDAH</a>
                            <a href="/explorar?spices=TOC" className={className}>TOC</a>
                            <a href="/explorar?spices=TLP" className={className}>TLP</a>
                            <a href="/explorar?spices=TAG" className={className}>TAG</a>
                            <a href="/explorar?spices=TP" className={className}>TP</a>
                            <a href="/explorar?spices=TPA" className={className}>TPA</a>
                            <a href="/explorar?spices=TB" className={className}>TB</a>
                        </nav>
                        <nav className="flex flex-col gap-3">
                            <a href="/explorar?spices=TEP" className={className}>TEP</a>
                            <a href="/explorar?spices=TD" className={className}>TD</a>
                            <a href="/explorar?spices=TE" className={className}>TE</a>
                            <a href="/explorar?spices=TA" className={className}>TA</a>
                            <a href="/explorar?spices=ADI" className={className}>Adicciones</a>
                            <a href="/explorar?spices=FOB" className={className}>Fobias</a>
                            <a href="/explorar?spices=OTR" className={className}>Otros</a>
                        </nav>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className='text-white dark:text-[var(--gris3)]'>Categorías</h3>
                    <nav className="flex flex-col gap-3">
                        <a href="/explorar?categoria=Arte" className={className}>Arte</a>
                        <a href="/explorar?categoria=Bienestar" className={className}>Bienestar</a>
                        <a href="/explorar?categoria=Cine" className={className}>Cine</a>
                        <a href="/explorar?categoria=Compartir" className={className}>Compartir</a>
                        <a href="/explorar?categoria=Documentales" className={className}>Documentales</a>
                        <a href="/explorar?categoria=Educación" className={className}>Educación</a>
                        <a href="/explorar?categoria=Gaming" className={className}>Gaming</a>
                        <a href="/explorar?categoria=Hogar" className={className}>Hogar</a>
                        <a href="/explorar?categoria=Lectura" className={className}>Lectura</a>
                        <a href="/explorar?categoria=Recetas" className={className}>Recetas</a>
                    </nav>
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className='text-white dark:text-[var(--gris3)]'>Tu espacio</h3>
                    <nav className="flex flex-col gap-3">
                        <a href={session?.user.userType === "expert" ? "/panel-experto" : "/panel-estandar"} className={className}>Espacio personal</a>
                        <a href={session?.user.userType === "expert" ? "/panel-experto/nuevo-share" : "/panel-estandar/nuevo-share"} className={className}>Compartir contenido</a>
                        <a href={session?.user.userType === "expert" ? "/panel-experto/shares-guardados" : "/panel-estandar/shares-guardados"} className={className}>Contenido guardado</a>
                        {!session?.user &&
                            <a href="/register-expert" className={className}>Convertirse en experto</a>
                        }
                        <a href="#" className={className}>Preguntas frecuentes</a>
                        <a href="#" className={className}>Política de Privacidad</a>
                        <a href="#" className={className}>Ayúdanos a mejorar</a>
                        {session?.user &&
                            <a href={session?.user.userType === "expert" ? "/panel-experto/configuracion" : "/panel-estandar/configuracion"} className={className}>Salir</a>
                        }
                    </nav>
                </div>
            </div>
        );
    }

    if (tipo === "footer-desplegable") {
        const className = "font-normal text-[var(--brand2)] dark:text-[var(--gris3)] hover:text-white dark:hover:text-[var(--gris2)]";

        return (
            <div className="w-full flex flex-col gap-0 px-4 py-4 rounded-xl bg-[var(--gris4)]">
                <Accordion type="single" collapsible>

                    <AccordionItem value="item-1" className="px-4 rounded-[0.4rem] hover:bg-[var(--gris3)]">
                        <AccordionTrigger className="pb-5 dark:text-[var(--gris3)]">Spices</AccordionTrigger>
                        <AccordionContent>
                            <nav className="flex flex-col">
                                <a href="/explorar?spices=TEA" className={className}>TEA</a>
                                <a href="/explorar?spices=TDAH" className={className}>TDAH</a>
                                <a href="/explorar?spices=TOC" className={className}>TOC</a>
                                <a href="/explorar?spices=TLP" className={className}>TLP</a>
                                <a href="/explorar?spices=TAG" className={className}>TAG</a>
                                <a href="/explorar?spices=TP" className={className}>TP</a>
                                <a href="/explorar?spices=TPA" className={className}>TPA</a>
                                <a href="/explorar?spices=TB" className={className}>TB</a>
                                <a href="/explorar?spices=TEP" className={className}>TEP</a>
                                <a href="/explorar?spices=TD" className={className}>TD</a>
                                <a href="/explorar?spices=TE" className={className}>TE</a>
                                <a href="/explorar?spices=TA" className={className}>TA</a>
                                <a href="/explorar?spices=ADI" className={className}>Adicciones</a>
                                <a href="/explorar?spices=FOB" className={className}>Fobias</a>
                                <a href="/explorar?spices=OTR" className={className}>Otros</a>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="px-4 rounded-[0.4rem] hover:bg-[var(--gris3)]">
                        <AccordionTrigger className="pb-5 dark:text-[var(--gris3)]">Categorías</AccordionTrigger>
                        <AccordionContent>
                            <nav className="flex flex-col">
                                <a href="/explorar?categoria=Arte" className={className}>Arte</a>
                                <a href="/explorar?categoria=Bienestar" className={className}>Bienestar</a>
                                <a href="/explorar?categoria=Cine" className={className}>Cine</a>
                                <a href="/explorar?categoria=Compartir" className={className}>Compartir</a>
                                <a href="/explorar?categoria=Documentales" className={className}>Documentales</a>
                                <a href="/explorar?categoria=Educación" className={className}>Educación</a>
                                <a href="/explorar?categoria=Gaming" className={className}>Gaming</a>
                                <a href="/explorar?categoria=Hogar" className={className}>Hogar</a>
                                <a href="/explorar?categoria=Lectura" className={className}>Lectura</a>
                                <a href="/explorar?categoria=Recetas" className={className}>Recetas</a>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="px-4 rounded-[0.4rem] hover:bg-[var(--gris3)]">
                        <AccordionTrigger className="pb-5 dark:text-[var(--gris3)]">Tu espacio</AccordionTrigger>
                        <AccordionContent>
                            <nav className="flex flex-col">
                                <a href={session?.user.userType === "expert" ? "/panel-experto" : "/panel-estandar"} className={className}>Espacio personal</a>
                                <a href={session?.user.userType === "expert" ? "/panel-experto/nuevo-share" : "/panel-estandar/nuevo-share"} className={className}>Compartir contenido</a>
                                <a href={session?.user.userType === "expert" ? "/panel-experto/shares-guardados" : "/panel-estandar/shares-guardados"} className={className}>Contenido guardado</a>
                                {!session?.user &&
                                    <a href="/register-expert" className={className}>Convertirse en experto</a>
                                }
                                <a href="#" className={className}>Preguntas frecuentes</a>
                                <a href="#" className={className}>Política de Privacidad</a>
                                <a href="#" className={className}>Ayúdanos a mejorar</a>
                                {session?.user &&
                                    <a href={session?.user.userType === "expert" ? "/panel-experto/configuracion" : "/panel-estandar/configuracion"} className={className}>Salir</a>
                                }
                            </nav>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        );
    }

    return null; // Por si no coincide con ninguno.
};

export default Menu;
