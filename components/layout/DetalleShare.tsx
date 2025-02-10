"use client";

import Image from "next/image";
import Avatar from "@/components/icons/Avatar";
import Boton from "@/components/buttons/Boton";


export default function DetalleShare() {

    return (
        <div className="w-full flex flex-col items-center gap-16 pb-[160px]">

            {/* CABECERA */}
            <div className="w-full min-h-[500px] max-h-[600px] flex flex-row">
                <div className="relative w-1/2">
                    <Image
                        src="/uploads/c73de387-1454-4cd0-8c2d-205709e50291-WALLPAPER-(NO-BORRAR).jpg"
                        alt="miniatura"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="w-1/2 h-full flex flex-col justify-center gap-8 p-20">
                    <div className="flex flex-row gap-4 items-center">
                        <Image
                            src="/iconos/iconos-genericos/icono-spiced.svg"
                            alt="miniatura"
                            width={15}
                            height={15}
                            className="object-cover"
                        />
                        <h4>Compartiendo experiencias</h4>
                    </div>
                    <h1>Entendiendo la Sobrecarga Sensorial: Mi Experiencia con el TDAH y el Autismo</h1>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="w-full flex flex-row gap-col1 px-col2">

                {/* Sidebar */}
                <div className="w-col3 flex flex-col gap-2">

                    <div className="w-full flex flex-col gap-5 border-b border-b-1 border-b-[var(--gris2)] px-2 pb-8">
                        <div className="w-full flex flex-col gap-3">
                            <div className="max-w-[120px]">
                                <Avatar borde="color" />
                            </div>
                            <h4 className="pl-2">@neurolucia</h4>
                        </div>
                        <Boton
                            texto="Seguir"
                            enlace="#"
                            tamano="pequeno"
                            jerarquia="primario"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-5 border-b border-b-1 border-b-[var(--gris2)] px-2 py-8">
                        <div className="w-full flex flex-col gap-3">
                            <h4 className="pl-2">Sobre este share:</h4>
                        </div>
                        <div className="w-full px-2">
                            <p className="font-bold text-[0.8rem] text-[var(--gris2)]">Publicado el:</p>
                            <p className="font-bold text-[0.8rem] text-[var(--gris2)]">13 de agosto de 2024</p>
                        </div>
                    </div>

                    <div className="inline-block px-2 py-8">
                        <Boton
                            texto="Guardar"
                            enlace="#"
                            tamano="pequeno"
                            jerarquia="secundario"
                            icon="/iconos/iconos-menu/icono-guardado.svg"
                        />
                    </div>

                </div>

                {/* Artículo */}
                <div className="w-full flex flex-col items-start gap-2 gap-8">
                    <p className="text-[1.2rem]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p className="text-[1.2rem]">Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.</p>
                    <div className="relative w-full h-[300px]">
                        <Image
                            src="/uploads/c73de387-1454-4cd0-8c2d-205709e50291-WALLPAPER-(NO-BORRAR).jpg"
                            alt="imagen secundaria"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <p className="text-[1.2rem]">Phasellus consequat. Aenean vitae quam. Vivamus et nunc. Nunc consequat sem a augue. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis diam. Pellentesque ut lectus ac quam malesuada scelerisque. Morbi luctus, wisi viverra faucibus pretium, nibh est placerat odio, nec commodo wisi enim eget quam.</p>
                    <p className="text-[1.2rem]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>

        </div>
    );
}
