import React from 'react';

interface HeaderProps {

}

const Header: React.FC = () => {
    return (
        <header className="w-full h-[80px] px-8 py-3 flex items-center justify-between gap-9 bg-[--blanco]">
            {/* Caja Principal */}
            <div className="flex items-center space-x-9">
                {/* Logo */}
                <a href="#">
                    <img
                        src="/logos/logo-spiced-pos.svg"
                        alt="Logo Spiced"
                        className="h-10"
                    />
                </a>
                {/* Menú */}
                <nav className="hidden md:flex space-x-6">
                    <a href="#">
                        Inicio
                    </a>
                    <a href="#">
                        Explorar
                    </a>
                    <a href="#">
                        Compartir
                    </a>
                </nav>
            </div>

            {/* Caja Buscador */}
            <div className="flex-1 flex items-center space-x-3 px-4 bg-[--gris1] dark:bg-[--gris5] rounded-full">
                <input
                    type="search"
                    placeholder="Buscar contenido"
                    className="flex-1 bg-[--gris1] dark:bg-[--gris5] text-foreground py-2 px-4 focus:outline-none"
                />
                <img
                    src="/iconos/iconos-genericos/search-icon.svg"
                    alt="Buscar"
                    className="h-5 px-3 cursor-pointer"
                />
            </div>

            {/* Caja Cuenta */}
            <div className="flex items-center space-x-4">
                <button className="md:hidden md:block bg-brand1 text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90">
                    Espacio personal
                </button>
                <img
                    src="/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"
                    alt="Cuenta"
                    className="h-10 w-10 cursor-pointer"
                />
            </div>

            {/* Menú Mobile */}
            <div className="md:hidden flex items-center">
                <img
                    src="/iconos/iconos-genericos/icono-burger.svg"
                    alt="Menú"
                    className="h-8 w-8 cursor-pointer"
                />
            </div>
        </header>
    );
};

export default Header;
