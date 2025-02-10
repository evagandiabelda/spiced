'use client';

import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (theme === "light") {
        return (
            <>
                {/* Grande: */}
                <div onClick={toggleTheme} className='mobile:hidden laptop:block rounded-full px-[7px] py-[4px] bg-[var(--gris4)] sombra-interior-dark cursor-pointer'>
                    <div id='opacidad' className='flex flex-row justify-between items-center pt-[2px] opacity-50 hover:opacity-100 transition ease duration-500'>
                        <Image
                            src="/iconos/iconos-otros/icono-dark.svg"
                            width={20}
                            height={20}
                            alt="activar modo oscuro"
                        />
                        <div className='px-2'>
                            <p className='a-boton-pq text-white'>Modo Oscuro</p>
                        </div>
                    </div>
                </div>
                {/* Pequeño: */}
                <div onClick={toggleTheme} className='mobile:block laptop:hidden rounded-full px-[7px] pt-[4px] pb-[2px] bg-[var(--gris4)] sombra-interior-dark cursor-pointer'>
                    <div id='opacidad' className='flex flex-row justify-between items-center pt-[2px] opacity-50 hover:opacity-100 transition ease duration-500'>
                        <Image
                            src="/iconos/iconos-otros/icono-dark.svg"
                            width={20}
                            height={20}
                            alt="activar modo oscuro"
                        />
                        <div className='px-3'></div>
                    </div>
                </div>
            </>
        );
    }

    if (theme === "dark") {
        return (
            <>
                {/* Grande: */}
                <div onClick={toggleTheme} className='mobile:hidden laptop:block rounded-full px-[7px] pt-[4px] pb-[6px] bg-[var(--gris3)] sombra-interior-light dark:border-2 dark:border-[var(--gris3)] cursor-pointer'>
                    <div id='opacidad' className='flex flex-row justify-between items-center pt-[2px] opacity-50 hover:opacity-100 transition ease duration-500'>
                        <div className='px-2'>
                            <p className='a-boton-pq text-[var(--gris5)] dark:text-[var(--gris1)]'>Modo Claro</p>
                        </div>
                        <Image
                            src="/iconos/iconos-otros/icono-light.svg"
                            width={20}
                            height={20}
                            className='dark:invert'
                            alt="activar modo claro"
                        />
                    </div>
                </div>
                {/* Pequeño: */}
                <div onClick={toggleTheme} className='mobile:block laptop:hidden rounded-full px-[7px] pt-[2px] pb-[5px] bg-[var(--gris3)] sombra-interior-light dark:border-2 dark:border-[var(--gris3)] cursor-pointer'>
                    <div id='opacidad' className='flex flex-row justify-between items-center pt-[2px] opacity-50 hover:opacity-100 transition ease duration-500'>
                        <div className='px-3'></div>
                        <Image
                            src="/iconos/iconos-otros/icono-light.svg"
                            width={20}
                            height={20}
                            className='dark:invert'
                            alt="activar modo claro"
                        />
                    </div>
                </div>
            </>
        );
    }

}
