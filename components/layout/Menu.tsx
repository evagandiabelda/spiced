'use client';

import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Boton from "../buttons/Boton";
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

    const { language, toggleLanguage } = useLanguage();
    const pathname = usePathname();

    if (tipo === "header") {
        return (
            <nav className="mobile:hidden laptop:flex items-center space-x-6">
                <a href="/" className="hover-underline">
                    {language === "es" ? "Inicio" : "Home"}
                </a>
                <a href="/explorar" className="hover-underline">
                    {language === "es" ? "Explorar" : "Explore"}
                </a>
                <a href="/panel-estandar/nuevo-share" className="hover-underline">
                    {language === "es" ? "Compartir" : "Share"}
                </a>
                <Boton
                    texto={language === "es" ? "English" : "Español"}
                    tamano="pequeno"
                    jerarquia="primario"
                    onClick={toggleLanguage}
                />
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
                        <p className="font-bold mb-0">{language === "es" ? "Inicio" : "Home"}</p>
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
                        <p className="font-bold mb-0">{language === "es" ? "Explorar" : "Explore"}</p>
                    </div>
                </a>

                <a href="/panel-estandar/nuevo-share">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] dark:hover:bg-[--gris4]">
                        <Image
                            src="/iconos/iconos-menu/icono-compartir.svg"
                            width={24}
                            height={24}
                            className="dark:invert"
                            alt="compartir"
                        />
                        <p className="font-bold mb-0">{language === "es" ? "Compartir" : "Share"}</p>
                    </div>
                </a>
                <div className="py-12">
                    <Boton
                        texto={language === "es" ? "English" : "Español"}
                        tamano="pequeno"
                        jerarquia="primario"
                        onClick={toggleLanguage}
                    />
                </div>
            </nav>
        );
    }

    if (tipo === "footer") {
        const className = "font-normal text-[var(--brand2)] hover:text-white";

        return (
            <div className="w-full flex mobile:flex-col tablet:flex-row mobile:gap-6 tablet:gap-16">
                <div className="flex flex-col gap-5">
                    <h3 className='text-white'>Spices</h3>
                    <div className="flex flex-row gap-6">
                        <nav className="flex flex-col gap-3">
                            <a href="#" className={className}>TEA</a>
                            <a href="#" className={className}>TDAH</a>
                            <a href="#" className={className}>TOC</a>
                            <a href="#" className={className}>TLP</a>
                            <a href="#" className={className}>TAG</a>
                            <a href="#" className={className}>TP</a>
                            <a href="#" className={className}>TPA</a>
                            <a href="#" className={className}>TB</a>
                        </nav>
                        <nav className="flex flex-col gap-3">
                            <a href="#" className={className}>TEP</a>
                            <a href="#" className={className}>TD</a>
                            <a href="#" className={className}>TE</a>
                            <a href="#" className={className}>TA</a>
                            <a href="#" className={className}>Adicciones</a>
                            <a href="#" className={className}>Fobias</a>
                            <a href="#" className={className}>Otros</a>
                        </nav>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className='text-white'>Categorías</h3>
                    <nav className="flex flex-col gap-3">
                        <a href="#" className={className}>Mindful cooking</a>
                        <a href="#" className={className}>Tips para el hogar</a>
                        <a href="#" className={className}>Cultura neurospicy</a>
                        <a href="#" className={className}>Bienestar emocional</a>
                        <a href="#" className={className}>Compartiendo experiencias</a>
                        <a href="#" className={className}>Recursos educativos</a>
                        <a href="#" className={className}>Gaming inclusivo</a>
                    </nav>
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className='text-white'>Tu espacio</h3>
                    <nav className="flex flex-col gap-3">
                        <a href="/panel-estandar" className={className}>Espacio personal</a>
                        <a href="/panel-estandar/nuevo-share" className={className}>Compartir contenido</a>
                        <a href="/panel-estandar/shares-guardados" className={className}>Contenido guardado</a>
                        <a href="#" className={className}>Convertirse en experto</a>
                        <a href="#" className={className}>Preguntas frecuentes</a>
                        <a href="#" className={className}>Ayúdanos a mejorar</a>
                        <a href="/panel-estandar/configuracion" className={className}>Salir</a>
                    </nav>
                </div>
            </div>
        );
    }

    if (tipo === "footer-desplegable") {
        const className = "font-normal text-[var(--brand2)] hover:text-[var(--blanco)]";

        return (
            <div className="w-full flex flex-col gap-0 px-4 py-4 rounded-xl bg-[var(--gris4)]">
                <Accordion type="single" collapsible>

                    <AccordionItem value="item-1" className="px-4 rounded-[0.4rem] hover:bg-[var(--gris3)]">
                        <AccordionTrigger className="pb-5">Spices</AccordionTrigger>
                        <AccordionContent>
                            <nav className="flex flex-col">
                                <a href="#" className={className}>TEA</a>
                                <a href="#" className={className}>TDAH</a>
                                <a href="#" className={className}>TOC</a>
                                <a href="#" className={className}>TLP</a>
                                <a href="#" className={className}>TAG</a>
                                <a href="#" className={className}>TP</a>
                                <a href="#" className={className}>TPA</a>
                                <a href="#" className={className}>TB</a>
                                <a href="#" className={className}>TEP</a>
                                <a href="#" className={className}>TD</a>
                                <a href="#" className={className}>TE</a>
                                <a href="#" className={className}>TA</a>
                                <a href="#" className={className}>Adicciones</a>
                                <a href="#" className={className}>Fobias</a>
                                <a href="#" className={className}>Otros</a>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="px-4 rounded-[0.4rem] hover:bg-[var(--gris3)]">
                        <AccordionTrigger className="pb-5">Categorías</AccordionTrigger>
                        <AccordionContent>
                            <nav className="flex flex-col">
                                <a href="#" className={className}>Mindful cooking</a>
                                <a href="#" className={className}>Tips para el hogar</a>
                                <a href="#" className={className}>Cultura neurospicy</a>
                                <a href="#" className={className}>Bienestar emocional</a>
                                <a href="#" className={className}>Compartiendo experiencias</a>
                                <a href="#" className={className}>Recursos educativos</a>
                                <a href="#" className={className}>Gaming inclusivo</a>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="px-4 rounded-[0.4rem] hover:bg-[var(--gris3)]">
                        <AccordionTrigger className="pb-5">Tu espacio</AccordionTrigger>
                        <AccordionContent>
                            <nav className="flex flex-col">
                                <a href="/panel-estandar/" className={className}>Espacio personal</a>
                                <a href="/panel-estandar/nuevo-share" className={className}>Compartir contenido</a>
                                <a href="/panel-estandar/shares-guardados" className={className}>Contenido guardado</a>
                                <a href="#" className={className}>Convertirse en experto</a>
                                <a href="#" className={className}>Preguntas frecuentes</a>
                                <a href="#" className={className}>Ayúdanos a mejorar</a>
                                <a href="/panel-estandar/configuracion" className={className}>Salir</a>
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
