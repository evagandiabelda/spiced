import { Metadata } from "next";
import Image from "next/image";
import DudasForm from "@/components/inputs/forms/dudas-form";

export const metadata: Metadata = {
    title: 'Normas de la Comunidad',
};

export default async function NormasComunidad() {

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
                        <h4>Última actualización: 25 abril 2025</h4>
                    </div>
                    <h1>Normas de la Comunidad</h1>
                </div>

                <div className="mobile:w-full tablet-w-col3 laptop:w-col2 h-auto flex flex-col items-center">
                    <Image
                        src="/imgs/img-normas.svg"
                        alt="imagen de apoyo"
                        width={300}
                        height={300}
                        className="object-contain"
                    />

                </div>

            </div>

            {/* CONTENIDO */}

            <div className='w-full flex flex-col items-center gap-12 mobile:px-col1 tablet:px-col1 laptop:py-16 border-b border-b-1 border-b-[#b0aaaa]'>

                <p>¡Bienvenido a Spiced! Nos encanta que formes parte de esta comunidad dedicada a la salud mental y el apoyo mutuo. Para asegurar que todos los miembros tengan una experiencia positiva y segura, te pedimos que sigas estas normas básicas:</p>

                <ol className="list-decimal flex flex-col gap-12">
                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Respeto y empatía</li></h2>
                        <ul className="list-disc flex flex-col gap-2 px-8 py-2">
                            <li>Trata a todos los miembros de la comunidad con respeto. Evita cualquier tipo de lenguaje ofensivo, insultos, o comentarios que puedan herir la sensibilidad de otros usuarios.</li>
                            <li>Respeta las experiencias y sentimientos de los demás. Esta es una plataforma donde la empatía y el apoyo son fundamentales.</li>
                        </ul>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Contenido apropiado</li></h2>
                        <ul className="list-disc flex flex-col gap-2 px-8 py-2">
                            <li>Comparte contenido relevante para la salud mental y las neurodivergencias. Evita publicar información que no esté relacionada con el propósito de la plataforma.</li>
                            <li>No publiques ni compartas contenido que promueva la violencia, odio, acoso o cualquier forma de discriminación.</li>
                        </ul>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Confidencialidad y privacidad</li></h2>
                        <ul className="list-disc flex flex-col gap-2 px-8 py-2">
                            <li>No compartas información personal o confidencial de otros usuarios sin su consentimiento explícito.</li>
                            <li>Respeta la privacidad de los demás. Si alguien comparte una experiencia personal, no la divulgues fuera de la plataforma sin permiso.</li>
                        </ul>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Información verídica</li></h2>
                        <ul className="list-disc flex flex-col gap-2 px-8 py-2">
                            <li>Asegúrate de que la información que compartes sea precisa y verificada, especialmente si es de carácter médico o psicológico. La difusión de información errónea puede ser perjudicial para la comunidad.</li>
                            <li>Los usuarios Expertos deben ser particularmente cuidadosos al proporcionar orientación o consejos, asegurando que están basados en conocimientos profesionales y actualizados.</li>
                        </ul>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Uso responsable del Servicio de Prevención</li></h2>
                        <ul className="list-disc flex flex-col gap-2 px-8 py-2">
                            <li>Si utilizas el servicio de ayuda y prevención contra el suicidio, hazlo de manera responsable. Este recurso es para quienes realmente lo necesitan en momentos de crisis.</li>
                            <li>No abuses del servicio. Es importante que los profesionales puedan atender a aquellos que más lo requieren.</li>
                        </ul>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>No al spam</li></h2>
                        <ul className="list-disc flex flex-col gap-2 px-8 py-2">
                            <li>Evita publicar spam, publicidad no solicitada o enlaces a sitios externos que no sean relevantes para la conversación.</li>
                            <li>Las recomendaciones de recursos externos deben ser hechas de buena fe y estar alineadas con los objetivos de la comunidad.</li>
                        </ul>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Comportamiento constructivo</li></h2>
                        <ul className="list-disc flex flex-col gap-2 px-8 py-2">
                            <li>Las críticas y sugerencias son bienvenidas, siempre que se hagan de manera constructiva y con el objetivo de mejorar la comunidad.</li>
                            <li>En las interacciones y comentarios, fomenta el diálogo positivo y la colaboración.</li>
                        </ul>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Moderación y cumplimiento</li></h2>
                        <ul className="list-disc flex flex-col gap-2 px-8 py-2">
                            <li>Nuestros moderadores están aquí para ayudar a mantener un ambiente seguro y acogedor. Si rompes estas normas, podrías recibir una advertencia, suspensión o, en casos graves, la expulsión de la plataforma.</li>
                            <li>Si ves un comportamiento que va en contra de estas normas, repórtalo a los moderadores para que puedan tomar las medidas adecuadas.</li>
                        </ul>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Actualizaciones de las Normas</li></h2>
                        <ul className="list-disc flex flex-col gap-2 px-8 py-2">
                            <li>Estas normas pueden actualizarse con el tiempo para reflejar mejor las necesidades de nuestra comunidad. Te notificaremos si hay cambios importantes, y te animamos a revisarlas periódicamente.</li>
                        </ul>
                    </div>
                </ol>

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