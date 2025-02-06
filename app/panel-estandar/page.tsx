import Image from "next/image";
import ThemeToggle from "@/components/buttons/ThemeToggle";
import Boton from "@/components/buttons/Boton";
import ItemListaShare from "@/components/cards/ItemListaShare";
import Input from "@/components/inputs/Input";

export default function Inicio() {
    return (
        <div className="w-full flex flex-col gap-12">

            {/* CABECERA: */}
            <div className="w-full flex flex-col gap-8">
                <div className="w-full flex mobile:flex-col-reverse tablet:flex-row justify-between mobile:items-between tablet:items-center mobile:gap-12 tablet:gap-3">
                    <h2>Tu espacio personal</h2>
                    <div className="flex flex-row justify-end gap-6">
                        <div className="flex flex-row justify-end gap-4">
                            <Image
                                src="/iconos/iconos-menu/icono-notificaciones.svg"
                                width={32}
                                height={32}
                                className="cursor-pointer hover:scale-110 transition ease dark:invert dark:opacity-70 dark:hover:opacity-100"
                                alt="notificaciones"
                            />
                            <Image
                                src="/iconos/iconos-otros/icono-insignia-mini-1.svg"
                                width={32}
                                height={32}
                                className="cursor-pointer hover:scale-110 transition ease dark:opacity-70 dark:hover:opacity-100"
                                alt="insignia actual"
                            />
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <p>Qué bien verte por aquí. ¿Cómo estás hoy? Desde aquí podrás gestionar tu cuenta, compartir cositas con la comunidad de Spice, consultar tus notificaciones y mucho más. ¡Adelante, explora!</p>
                </div>
            </div>

            {/* CONTENIDO: */}
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex mobile:flex-col laptop:flex-row justify-between gap-4">
                    {/* Card Estadísticas: */}
                    <div className="min-w-col3 flex flex-col justify-between rounded-xl p-[30px] bg-[var(--tdah)] dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--tdah)]">
                        <div id="caja-sup" className="w-full h-full flex flex-row pb-6 border-b border-[var(--negro)]">
                            <div className="w-full h-100">
                                <a href="/panel-estandar/nuevo-share">
                                    <div className="flex flex-row gap-2 items-center hover:scale-105 transition ease">
                                        <Image
                                            src="/iconos/iconos-otros/icono-agregar.svg"
                                            width={28}
                                            height={28}
                                            alt="nuevo share"
                                        />
                                        <p className="font-bold">Nuevo share</p>
                                    </div>
                                </a>
                            </div>
                            <div className="h-full flex flex-col justify-end">
                                <a href="/panel-estandar/tus-shares">
                                    <div className="w-full h-100 flex flex-col justify-end items-right gap-6">
                                        <p className="font-bold text-[4rem] text-right">12</p>
                                        <p className="text-[1.2rem] font-bold text-right">shares publicados</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div id="caja-inf" className="w-full h-[100px] flex flex-row justify-between pt-6">
                            <div className="w-full h-100 flex flex-col justify-end">
                                <a href="/panel-estandar/shares-guardados"><p className="text-[0.9rem] font-bold">27 guardados</p></a>
                            </div>
                            <div className="w-full h-100 flex flex-col justify-end">
                                <p className="text-[0.9rem] font-bold text-right">0 comentarios</p>
                            </div>
                        </div>
                    </div>
                    {/* Card Pingüinadas: */}
                    <div className="w-full flex mobile:flex-col-reverse tablet:flex-row gap-2 rounded-xl bg-[var(--fob)] px-[36px] py-[40px] gap-[2.8rem] dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--fob)]">
                        <div id="caja-izq" className="w-full h-100 flex flex-col justify-center gap-8">
                            <p>Los pingüinos suelen regalarse piedrecitas unos a otros en señal de afecto. Envía una pingüinada a alguien que te importe.</p>
                            <Input tipo="text" placeholder="Su nombre de usuario" />
                            <div className="dark:hidden">
                                <Boton texto="Enviar una pingüinada" enlace="#" tamano="pequeno" jerarquia="primario" />
                            </div>
                            <div className="hidden dark:block">
                                <Boton texto="Enviar una pingüinada" enlace="#" tamano="pequeno" jerarquia="var(--fob)" />
                            </div>
                        </div>
                        <div id="caja-der" className="min-w-col1 h-100 flex flex-col justify-center items-center">
                            <Image
                                src="/imgs/IMG-Pinguino.svg"
                                width={300}
                                height={300}
                                alt="imagen de un pingüino"
                            />
                        </div>
                    </div>
                </div>
                {/* Card Últimos Shares Guardados: */}
                <div className="w-full flex flex-col rounded-xl bg-[var(--tpa)] p-[30px] pt-[24px] gap-3 dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--tpa)]">
                    <div className="w-full flex flex-row justify-between items-start">
                        <h4>Últimos shares guardados</h4>
                        <Image
                            src="/iconos/iconos-menu/icono-guardado.svg"
                            width={18}
                            height={18}
                            className="dark:invert"
                            alt="últimos shares guardados"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-8 px-[30px] py-[40px] rounded-xl bg-white dark:bg-[var(--gris4)]">
                        <ItemListaShare />
                        <ItemListaShare />
                        <ItemListaShare />
                        <ItemListaShare />
                        <ItemListaShare />
                    </div>
                </div>
            </div>

        </div>
    );
}
