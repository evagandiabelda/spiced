'use client';

type tipo = {
    // Valores aceptados:
    tipo: "header" | "desplegable" | "footer";
};

const Menu = ({ tipo }: tipo) => {
    if (tipo === "header") {
        return (
            <nav className="mobile:hidden laptop:flex space-x-6">
                <a href="/">
                    Inicio
                </a>
                <a href="/feed">
                    Explorar
                </a>
                <a href="/panel">
                    Compartir
                </a>
            </nav>
        );
    }

    if (tipo === "desplegable") {
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
        return (
            <nav></nav>
        );
    }

    return null; // Por si no coincide con ninguno.
};

export default Menu;
