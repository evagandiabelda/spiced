"use client";

import React from 'react';
import Logo from '@/components/icons/Logo';

interface HeaderProps {

}

const Header = () => {
    return (
        <header className="w-full h-[80px] px-8 py-3 flex items-center justify-between gap-9 bg-[--blanco] dark:bg-[--negro]">
            {/* Caja Principal */}
            <div className="flex items-center space-x-9">
                {/* Logo */}
                <Logo />
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
                    className="flex-1 bg-[--gris1] dark:bg-[--gris5] py-2 px-4 focus:outline-none"
                />
                <img
                    src="/iconos/iconos-genericos/search-icon.svg"
                    alt="Buscar"
                    className="h-5 px-3 cursor-pointer"
                />
            </div>

            {/* Caja Cuenta */}
            <div className="flex items-center space-x-4">
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
