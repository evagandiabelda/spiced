import { Metadata } from "next";
import Image from "next/image";
import DudasForm from "@/components/inputs/forms/dudas-form";

export const metadata: Metadata = {
    title: 'Política de Privacidad',
};

export default async function PoliticaPrivacidad() {

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
                    <h1>Política de Privacidad</h1>
                </div>

                <div className="mobile:w-full tablet-w-col3 laptop:w-col2 h-auto flex flex-col items-center">
                    <Image
                        src="/imgs/img-privacidad.svg"
                        alt="imagen de apoyo"
                        width={300}
                        height={300}
                        className="object-contain"
                    />

                </div>

            </div>

            {/* CONTENIDO */}

            <div className='w-full flex flex-col items-center gap-12 mobile:px-col1 tablet:px-col1 mobile:pb-16 laptop:py-16 border-b border-b-1 border-b-[#b0aaaa]'>

                <p>En Spiced, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, usamos, protegemos y compartimos tus datos personales al utilizar nuestra plataforma.</p>

                <ol className="list-decimal flex flex-col gap-12">
                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Datos Personales Recogidos</li></h2>
                        <div className="w-full flex flex-col gap-2">
                            <p>Al registrarte en Spiced, recopilamos los siguientes datos personales:</p>
                            <ul className="list-disc flex flex-col gap-2 px-8 py-2">
                                <li>Datos obligatorios: Correo electrónico, contraseña, nombre de usuario (único), alias.</li>
                                <li>Datos opcionales: Foto de perfil, descripción, selección de "Spices" (condiciones que padeces o sospechas, o especialidades para los Usuarios Expertos).</li>
                                <li>Documentación adicional (solo para Usuarios Expertos): Documentación acreditativa de su condición de profesional de la salud mental.</li>
                            </ul>
                            <p>Además, recopilamos datos automáticamente mediante cookies y otras tecnologías similares. Estos datos pueden incluir tu dirección IP, tipo de navegador, páginas visitadas y otras actividades en la plataforma.</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Finalidad del Uso de los Datos</li></h2>
                        <div className="w-full flex flex-col gap-2">
                            <p>Los datos personales que recopilamos se utilizan con los siguientes propósitos:</p>
                            <ul className="list-disc flex flex-col gap-2 px-8 py-2">
                                <li>Personalización del contenido: Adaptamos la experiencia del usuario, mostrándote contenido relevante según tus "Spices" y preferencias.</li>
                                <li>Fomento de interacciones: Facilitamos las conexiones entre Usuarios Estándares y Usuarios Expertos, promoviendo la concertación de sesiones de terapia según intereses comunes.</li>
                                <li>Procesamiento de pagos: En el caso de los Usuarios Expertos, se utiliza la información necesaria para procesar pagos a través de pasarelas seguras.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Compartición de Datos con Terceros</li></h2>
                        <div className="w-full flex flex-col gap-2">
                            <p>Los datos personales visibles (nombre de usuario, alias, foto de perfil, descripción, "Spices", y Shares) pueden ser vistos por otros usuarios de la plataforma.</p>
                            <p>Es posible que los datos se compartan con proveedores de servicios de pago, como PayPal o Stripe, para procesar las transacciones necesarias.</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Retención de Datos</li></h2>
                        <div className="w-full flex flex-col gap-2">
                            <p>Los datos personales se retendrán durante el tiempo que tu cuenta esté activa. En el caso de que elimines tu cuenta, todos tus datos personales serán borrados de nuestros sistemas en un plazo máximo de 30 días. Podrás gestionar la eliminación de tu cuenta y datos a través de la sección "Configuración" de tu "Espacio Personal".</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Seguridad de los Datos</li></h2>
                        <div className="w-full flex flex-col gap-2">
                            <p>Nos comprometemos a proteger tus datos personales mediante la implementación de medidas de seguridad técnicas y organizativas adecuadas. Utilizamos cifrado, firewalls y otros protocolos de seguridad para garantizar que tus datos estén protegidos contra accesos no autorizados, pérdida o alteración.</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Derechos de los Usuarios</li></h2>
                        <div className="w-full flex flex-col gap-2">
                            <p>Tienes derecho a acceder, rectificar, eliminar y ocultar tus datos personales. Puedes ejercer estos derechos directamente desde la sección "Configuración" de tu "Espacio Personal". Si necesitas asistencia adicional, puedes contactar con nosotros en <a href="mailto:soporte@spiced.com" className="hover:underline">soporte@spiced.com</a>.</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Transferencia de Datos</li></h2>
                        <div className="w-full flex flex-col gap-2">
                            <p>Tus datos personales se almacenan y procesan dentro del Espacio Económico Europeo (EEE). No transferimos datos fuera del EEE.</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        <h2><li>Actualizaciones y Cambios en la Política de Privacidad</li></h2>
                        <div className="w-full flex flex-col gap-2">
                            <p>Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Si realizamos cambios significativos, te notificaremos a través del correo electrónico vinculado a tu cuenta de Spiced. Te recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos tu privacidad.</p>
                        </div>
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