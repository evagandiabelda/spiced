import { Metadata } from "next";
import Image from "next/image";
import SapsForm from "@/components/inputs/forms/saps-form";

export const metadata: Metadata = {
    title: 'SAPS',
};

export default async function Saps() {

    return (
        <div className="w-full flex flex-col items-center mobile:gap-12 tablet:gap-0 tablet:px-col1 pt-[3rem] pb-32">

            {/* 'Volver' */}

            <div className="w-full flex flex-row items-center gap-4 px-col1">
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
                        <h4>Sistema de Ayuda y Prevención del Suicidio</h4>
                    </div>
                    <h1>Vamos a ayudarte</h1>
                </div>

                <div className="mobile:w-full tablet-w-col3 laptop:w-col2 h-auto flex flex-col items-center">
                    <Image
                        src="/imgs/img-saps.svg"
                        alt="imagen de apoyo"
                        width={300}
                        height={300}
                        className="object-contain"
                    />

                </div>

            </div>

            {/* CONTENIDO */}

            <div className='w-full flex flex-col items-center gap-12 tablet:px-col1 py-16 border-b border-b-1 border-b-[#b0aaaa]'>
                <SapsForm />
            </div>

            {/* CIERRE */}

            <div className='w-full flex flex-col items-center gap-16 mobile:px-col1 tablet:px-col1 mobile:pt-4 tablet:pt-20'>

                <h2 className="text-center">¿En qué consiste este servicio de ayuda?</h2>

                <ol className="list-decimal flex flex-col gap-12 mobile:px-8 tablet:px-0">
                    <div className="w-full flex flex-col gap-6">
                        <h3><li>Disponibilidad 24/7</li></h3>
                        <p>Este servicio está disponible las 24 horas del día, los 7 días de la semana. No importa cuándo necesites ayuda, siempre habrá alguien aquí para escucharte.</p>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h3><li>Atención gratuita y confidencial</li></h3>
                        <p>El servicio es completamente gratuito y anónimo. No necesitas compartir tu nombre o ningún dato personal a menos que desees hacerlo. Estamos aquí para ofrecerte apoyo sin juicios ni preguntas innecesarias.</p>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h3><li>Asistencia profesional y humana</li></h3>
                        <p>A diferencia de otros servicios, aquí no recibirás respuestas automatizadas. Cada mensaje es atendido por profesionales de la salud mental que han decidido ofrecer su tiempo y conocimiento para ayudarte.</p>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h3><li>Uso responsable</li></h3>
                        <p>Este chat está diseñado para aquellos momentos en los que los pensamientos suicidas o de autolesión están presentes. Te pedimos que utilices este servicio de manera responsable, para que podamos ofrecer la ayuda adecuada a quienes realmente lo necesitan.</p>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h3><li>¿Qué esperar de este sistema?</li></h3>
                        <p>Cuando envíes tu mensaje, serás recibido por un mensaje tranquilizador. A partir de ahí, un profesional estará listo para escucharte, ofrecerte apoyo y ayudarte a encontrar el camino hacia la seguridad y el bienestar.</p>
                    </div>
                </ol>

            </div>

        </div>
    );

}