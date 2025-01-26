'use client';

type MenuSidebarProps = {
    usuario: "estandar" | "experto";
}


const MenuSidebar = ({ usuario }: MenuSidebarProps) => {

    if (usuario === "estandar") {
        return (
            <nav className="w-full flex-col justify-start align-start gap-2">
                <a href="/panel-estandar" className="w-full">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-menu/icono-inicio.svg" alt="inicio" className="h-6 invert" />
                        <p className="font-bold mb-0">Inicio</p>
                    </div>
                </a>

                <a href="/panel-estandar/nuevo-share">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-menu/icono-nuevo.svg" alt="nuevo share" className="h-6 invert" />
                        <p className="font-bold mb-0">Nuevo Share</p>
                    </div>
                </a>

                <a href="/panel-estandar/tus-shares">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-menu/icono-clip.svg" alt="tus shares" className="h-6 invert" />
                        <p className="font-bold mb-0">Tus Shares</p>
                    </div>
                </a>

                <a href="/panel-estandar/shares-guardados" className="w-full">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-menu/icono-guardado.svg" alt="shares guardados" className="h-6 invert" />
                        <p className="font-bold mb-0">Shares guardados</p>
                    </div>
                </a>

                <a href="/panel-estandar/insignias">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-menu/icono-insignia.svg" alt="insignias" className="h-6 invert" />
                        <p className="font-bold mb-0">Insignias</p>
                    </div>
                </a>

                <a href="/panel-estandar/configuracion">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-menu/icono-configuracion.svg" alt="configuracion" className="h-6 invert" />
                        <p className="font-bold mb-0">Configuración</p>
                    </div>
                </a>
            </nav>
        );
    }

    if (usuario === "experto") {
        return (
            <nav className="w-full flex-col justify-start align-start gap-2">
                <a href="/panel-experto" className="w-full">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-menu/icono-inicio.svg" alt="inicio" className="h-6 invert" />
                        <p className="font-bold mb-0">Inicio</p>
                    </div>
                </a>

                <a href="/panel-experto/nuevo-share">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-menu/icono-nuevo.svg" alt="nuevo share" className="h-6 invert" />
                        <p className="font-bold mb-0">Nuevo Share</p>
                    </div>
                </a>

                <a href="/panel-experto/tus-shares">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-menu/icono-clip.svg" alt="tus shares" className="h-6 invert" />
                        <p className="font-bold mb-0">Tus Shares</p>
                    </div>
                </a>

                <a href="/panel-experto/shares-guardados" className="w-full">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-menu/icono-guardado.svg" alt="shares guardados" className="h-6 invert" />
                        <p className="font-bold mb-0">Shares guardados</p>
                    </div>
                </a>

                <a href="/panel-experto/sesiones">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-otros/icono-euro.svg" alt="sesiones" className="h-6 invert" />
                        <p className="font-bold mb-0">Sesiones</p>
                    </div>
                </a>

                <a href="/panel-experto/verificaciones">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-otros/icono-verificado-lineal.svg" alt="verificaciones" className="h-6 invert" />
                        <p className="font-bold mb-0">Verificaciones</p>
                    </div>
                </a>

                <a href="/panel-experto/configuracion">
                    <div className="flex flex-row items-center w-full gap-5 p-4 rounded-xl hover:bg-[--gris1] hover:bg-white/20">
                        <img src="/iconos/iconos-menu/icono-configuracion.svg" alt="configuracion" className="h-6 invert" />
                        <p className="font-bold mb-0">Configuración</p>
                    </div>
                </a>
            </nav>
        );
    }


};

export default MenuSidebar;
