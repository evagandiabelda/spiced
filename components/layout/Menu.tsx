'use client';

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
    if (tipo === "header") {
        return (
            <nav className="mobile:hidden laptop:flex space-x-6">
                <a href="/" className="hover-underline">
                    Inicio
                </a>
                <a href="/feed" className="hover-underline">
                    Explorar
                </a>
                <a href="/panel" className="hover-underline">
                    Compartir
                </a>
            </nav>
        );
    }

    if (tipo === "header-desplegable") {
        return (
            <nav className="mobile:flex laptop:hidden w-full flex-col gap-2">
                <a href="/" className="w-full">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] dark:hover:bg-[--gris4]">
                        <img src="/iconos/iconos-menu/icono-inicio.svg" alt="Inicio" className="w-6 dark:invert" />
                        <p className="font-bold mb-0">Inicio</p>
                    </div>
                </a>

                <a href="/feed">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] dark:hover:bg-[--gris4]">
                        <img src="/iconos/iconos-menu/icono-explorar.svg" alt="Inicio" className="w-6 dark:invert" />
                        <p className="font-bold mb-0">Explorar</p>
                    </div>
                </a>

                <a href="/panel">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] dark:hover:bg-[--gris4]">
                        <img src="/iconos/iconos-menu/icono-compartir.svg" alt="Inicio" className="w-6 dark:invert" />
                        <p className="font-bold mb-0">Compartir</p>
                    </div>
                </a>
            </nav>
        );
    }

    if (tipo === "footer") {
        const className = "font-normal text-[var(--brand2)] hover:text-[var(--blanco)]";

        return (
            <div className="w-full flex mobile:flex-col tablet:flex-row mobile:gap-6 tablet:gap-16">
                <div>
                    <h3>Spices</h3>
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
                <div>
                    <h3>Categorías</h3>
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
                <div>
                    <h3>Tu espacio</h3>
                    <nav className="flex flex-col gap-3">
                        <a href="#" className={className}>Espacio personal</a>
                        <a href="#" className={className}>Compartir contenido</a>
                        <a href="#" className={className}>Contenido guardado</a>
                        <a href="#" className={className}>Convertirse en experto</a>
                        <a href="#" className={className}>Preguntas frecuentes</a>
                        <a href="#" className={className}>Ayúdanos a mejorar</a>
                        <a href="#" className={className}>Salir</a>
                    </nav>
                </div>
            </div>
        );
    }

    if (tipo === "footer-desplegable") {
        const className = "font-normal text-[var(--brand2)] hover:text-[var(--blanco)]";

        return (
            <div className="w-full flex flex-col gap-0 px-7 py-2 rounded-xl bg-[var(--gris4)]">
                <Accordion type="single" collapsible>

                    <AccordionItem value="item-1">
                        <AccordionTrigger>Spices</AccordionTrigger>
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

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Categorías</AccordionTrigger>
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

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Tu espacio</AccordionTrigger>
                        <AccordionContent>
                            <nav className="flex flex-col">
                                <a href="#" className={className}>Espacio personal</a>
                                <a href="#" className={className}>Compartir contenido</a>
                                <a href="#" className={className}>Contenido guardado</a>
                                <a href="#" className={className}>Convertirse en experto</a>
                                <a href="#" className={className}>Preguntas frecuentes</a>
                                <a href="#" className={className}>Ayúdanos a mejorar</a>
                                <a href="#" className={className}>Salir</a>
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
