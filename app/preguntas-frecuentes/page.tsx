import { Metadata } from "next";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import DudasForm from "@/components/inputs/forms/dudas-form";

export const metadata: Metadata = {
    title: 'Preguntas Frecuentes',
};

export default async function PreguntasFrecuentes() {

    const triggerClassname = "pb-6 font-inter font-bold text-[var(--gris4)] dark:text-[var(--gris2)] px-6 mobile:py-10 laptop:py-6 rounded-xl bg-white dark:bg-[var(--gris4)] shadow-sm";

    return (
        <div className="w-full flex flex-col items-center mobile:gap-12 tablet:gap-0 px-col1 pt-[3rem] pb-32">

            {/* 'Volver' */}

            <div className="w-full flex flex-row items-center gap-4">
                <Image
                    src="/iconos/iconos-otros/icono-flecha-desplegar.svg"
                    alt="Volver al Feed"
                    width={12}
                    height={12}
                    className="rotate-90"
                />
                <a href="/explorar" className="text-[var(--gris3)]">Volver</a>
            </div>

            {/* CABECERA */}

            <div className="w-full flex mobile:flex-col tablet:flex-row tablet:justify-between items-center gap-8 tablet:px-col1 border-b border-b-1 border-b-[#b0aaaa]">

                <div className="w-full flex flex-col mobile:items-center tablet:items-start mobile:text-center tablet:text-left tablet:flex-1 gap-6">
                    <div className="flex flex-row gap-4 items-center">
                        <Image
                            src="/iconos/iconos-genericos/icono-spiced.svg"
                            alt="miniatura"
                            width={15}
                            height={15}
                            className="object-cover"
                        />
                        <h4 className="dark:text-[var(--gris3)]">Resolvemos tus dudas</h4>
                    </div>
                    <h1>Preguntas y Respuestas Frecuentes</h1>
                </div>

                <div className="mobile:w-full tablet-w-col3 laptop:w-col2 h-auto flex flex-col items-center">
                    <Image
                        src="/imgs/img-faq.svg"
                        alt="imagen de apoyo"
                        width={300}
                        height={300}
                        className="object-contain"
                    />

                </div>

            </div>

            {/* CONTENIDO */}

            <div className='w-full flex flex-col items-center gap-10 tablet:px-col1 tablet:py-16 border-b border-b-1 border-b-[#b0aaaa]'>
                <Accordion type="single" collapsible className="w-full">

                    <AccordionItem value="item-1" className="mb-4">
                        <AccordionTrigger className={triggerClassname}>¿Cómo puedo registrarme en Spiced y qué información es necesaria?</AccordionTrigger>
                        <AccordionContent className="px-8 py-6">
                            <p>Para registrarte en Spiced, necesitarás proporcionar un correo electrónico, una contraseña, un nombre de usuario único y un alias. Si te registras como Usuario Experto, también deberás subir documentos que acrediten tu estatus de profesional de la salud mental.</p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="mb-4">
                        <AccordionTrigger className={triggerClassname}>¿Qué son los "Spices" y cómo puedo elegirlos?</AccordionTrigger>
                        <AccordionContent className="p-6">
                            <p>Los "Spices" son las condiciones o trastornos psicológicos que te afectan o en los que te especializas profesionalmente (si eres usuario experto). Puedes elegir tus Spices durante el proceso de registro o desde tu perfil en cualquier momento.</p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="mb-4">
                        <AccordionTrigger className={triggerClassname}>¿Cómo funciona el sistema de verificación para Usuarios Expertos?</AccordionTrigger>
                        <AccordionContent className="p-6">
                            <p>Los Usuarios Expertos deben enviar documentación que acredite su condición de profesionales de la salud mental. Estos documentos serán revisados por los moderadores de Spiced, quienes verificarán la autenticidad antes de otorgar el estatus de "Experto".</p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="mb-4">
                        <AccordionTrigger className={triggerClassname}>¿Qué tipo de contenido puedo compartir en Spiced?</AccordionTrigger>
                        <AccordionContent className="p-6">
                            <p>Puedes compartir cualquier contenido relacionado con la salud mental y las neurodivergencias, siempre que sea respetuoso y preciso. Esto incluye artículos, recomendaciones, y recursos útiles. No se permite contenido ofensivo o que difunda información falsa.</p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="mb-4">
                        <AccordionTrigger className={triggerClassname}>¿Cómo puedo buscar y filtrar contenido en Spiced?</AccordionTrigger>
                        <AccordionContent className="p-6">
                            <p>Puedes buscar Shares (publicaciones) por título o por nombre de usuario a través del buscador en la cabecera. Además, puedes visitar la página de "Explorar" para ver un feed de Shares, que puedes filtrar por categoría, Spices, y otros criterios.</p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6" className="mb-4">
                        <AccordionTrigger className={triggerClassname}>¿Cómo puedo interactuar con otros usuarios en Spiced?</AccordionTrigger>
                        <AccordionContent className="p-6">
                            <p>Puedes interactuar siguiendo a otros usuarios, guardando sus Shares o comentando en ellos. No se permiten mensajes privados para fomentar una interacción abierta y transparente en la comunidad.</p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-7" className="mb-4">
                        <AccordionTrigger className={triggerClassname}>¿Cómo se manejan las denuncias de contenido inapropiado?</AccordionTrigger>
                        <AccordionContent className="p-6">
                            <p>Puedes denunciar contenido inapropiado utilizando el botón "Denunciar contenido" que encontrarás en cada Share o perfil de usuario. Nuestro equipo de moderadores revisará todas las denuncias y tomará las medidas necesarias.</p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-8" className="mb-4">
                        <AccordionTrigger className={triggerClassname}>¿Cómo puedo obtener ayuda en situaciones de crisis?</AccordionTrigger>
                        <AccordionContent className="p-6">
                            <p>Spiced ofrece un sistema gratuito de ayuda y prevención contra el suicidio. Los Usuarios Expertos que se adhieran voluntariamente a este sistema estarán disponibles para ofrecer asistencia en momentos de crisis.</p>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>

            {/* CIERRE */}

            <div className='w-full flex flex-col items-center gap-12 tablet:px-col1 mobile:pt-10 laptop:pt-20'>

                <div className="w-full flex flex-col text-center gap-8 px-col1">
                    <h2>¿Sigues teniendo dudas?</h2>
                    <p>Te ayudamos a esclarecer cualquier otro aspecto relativo al uso y funcionamiento de nuestra plataforma.</p>
                </div>

                <DudasForm />

            </div>

        </div>
    );

}