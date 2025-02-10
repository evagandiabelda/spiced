"use client";

import React from 'react';
import { useState, Suspense } from "react";
import Logo from '@/components/icons/Logo';
import Menu from '@/components/layout/Menu';
import Search from '@/components/inputs/Search';
import Avatar from '@/components/icons/Avatar';
import MenuDesplegable from "@/components/layout/MenuDesplegable";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full h-[80px] px-8 py-3 flex items-center justify-between gap-9 bg-[--blanco] dark:bg-[--negro]">
            {/* Caja Principal */}
            <div className="flex items-center space-x-9">
                {/* Logo */}
                <Logo />
                {/* Menú */}
                <Menu tipo="header" />
            </div>

            {/* Caja Buscador */}
            <div className='flex-1 flex mobile:hidden tablet:flex'>
                <Suspense fallback={null}>
                    <Search />
                </Suspense>
            </div>

            {/* Caja Avatar */}
            <a href="/panel-estandar" className="w-12 flex items-center space-x-4 mobile:hidden laptop:flex">
                <Avatar borde='color' />
            </a>

            {/* Menú Mobile */}
            <div className="flex items-center mobile:flex laptop:hidden">
                <img
                    src="/iconos/iconos-genericos/icono-burger.svg"
                    alt="Menú"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => setIsMenuOpen(true)}
                />

                <MenuDesplegable isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            </div>
        </header>
    );
};

export default Header;
