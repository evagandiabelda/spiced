'use client';

import ItemMenuSidebar from "./ItemMenuSidebar";

type MenuSidebarProps = {
    usuario: "estandar" | "experto" | "admin";
}

export default function MenuSidebar({ usuario }: MenuSidebarProps) {

    const className = "w-full flex mobile:flex-row tablet:flex-col mobile:justify-between tablet:justify-start tablet:items-center laptop:items-start mobile:gap-0 tablet:gap-2";

    if (usuario === "estandar") {

        return (
            <nav className={className}>
                <ItemMenuSidebar enlace="/panel-estandar" icono="/iconos/iconos-menu/icono-inicio.svg" texto="Inicio" />
                <ItemMenuSidebar enlace="/panel-estandar/nuevo-share" icono="/iconos/iconos-menu/icono-nuevo.svg" texto="Nuevo Share" />
                <ItemMenuSidebar enlace="/panel-estandar/tus-shares" icono="/iconos/iconos-menu/icono-clip.svg" texto="Tus Shares" />
                <ItemMenuSidebar enlace="/panel-estandar/shares-guardados" icono="/iconos/iconos-menu/icono-guardado.svg" texto="Shares guardados" />
                <ItemMenuSidebar enlace="/panel-estandar/insignias" icono="/iconos/iconos-menu/icono-insignia.svg" texto="Insignias" />
                <ItemMenuSidebar enlace="/panel-estandar/configuracion" icono="/iconos/iconos-menu/icono-configuracion.svg" texto="Configuración" />
            </nav>
        );
    }

    if (usuario === "experto") {
        return (
            <nav className={className}>
                <ItemMenuSidebar enlace="/panel-experto" icono="/iconos/iconos-menu/icono-inicio.svg" texto="Inicio" />
                <ItemMenuSidebar enlace="/panel-experto/nuevo-share" icono="/iconos/iconos-menu/icono-nuevo.svg" texto="Nuevo Share" />
                <ItemMenuSidebar enlace="/panel-experto/tus-shares" icono="/iconos/iconos-menu/icono-clip.svg" texto="Tus Shares" />
                <ItemMenuSidebar enlace="/panel-experto/shares-guardados" icono="/iconos/iconos-menu/icono-guardado.svg" texto="Shares guardados" />
                <ItemMenuSidebar enlace="/panel-experto/sesiones" icono="/iconos/iconos-otros/icono-euro.svg" texto="Sesiones" />
                <ItemMenuSidebar enlace="/panel-experto/verificaciones" icono="/iconos/iconos-otros/icono-verificado-lineal.svg" texto="Verificaciones" />
                <ItemMenuSidebar enlace="/panel-experto/configuracion" icono="/iconos/iconos-menu/icono-configuracion.svg" texto="Configuración" />
            </nav>
        );
    }

    if (usuario === "admin") {
        return (
            <nav className={className}>
                <ItemMenuSidebar enlace="/panel-admin" icono="/iconos/iconos-menu/icono-inicio.svg" texto="Inicio" />
                <ItemMenuSidebar enlace="/panel-admin/verificaciones" icono="/iconos/iconos-otros/icono-verificado-lineal.svg" texto="Verificaciones" />
                <ItemMenuSidebar enlace="/panel-admin/usuarios" icono="/iconos/iconos-menu/icono-usuarios.svg" texto="Usuarios" />
                <ItemMenuSidebar enlace="/panel-admin/shares" icono="/iconos/iconos-menu/icono-share.svg" texto="Shares" />
                <ItemMenuSidebar enlace="/panel-admin/comentarios" icono="/iconos/iconos-menu/icono-comentario.svg" texto="Comentarios" />
                <ItemMenuSidebar enlace="/panel-admin/denuncias" icono="/iconos/iconos-menu/icono-denuncias.svg" texto="Denuncias" />
                <ItemMenuSidebar enlace="/panel-admin/spices" icono="/iconos/iconos-menu/icono-spices.svg" texto="Spices" />
                <ItemMenuSidebar enlace="/panel-admin/categorias" icono="/iconos/iconos-menu/icono-categorias.svg" texto="Categorías" />
            </nav>
        );
    }


};