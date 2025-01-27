'use client';

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
                    <div id='opacidad' className='flex flex-row justify-between items-center opacity-50 hover:opacity-100 transition ease duration-500'>
                        <img src="/iconos/iconos-otros/icono-dark.svg" alt="activar modo oscuro" className='w-5' />
                        <div className='px-2'>
                            <p className='a-boton-pq text-white'>Modo Oscuro</p>
                        </div>
                    </div>
                </div>
                {/* Pequeño: */}
                <div onClick={toggleTheme} className='mobile:block laptop:hidden rounded-full px-[7px] pt-[6px] pb-[2px] bg-[var(--gris4)] sombra-interior-dark cursor-pointer'>
                    <div id='opacidad' className='flex flex-row justify-between items-center opacity-50 hover:opacity-100 transition ease duration-500'>
                        <img src="/iconos/iconos-otros/icono-dark.svg" alt="activar modo oscuro" className='w-5' />
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
                <div onClick={toggleTheme} className='mobile:hidden laptop:block rounded-full px-[7px] py-[4px] bg-[var(--brand2)] sombra-interior-light cursor-pointer'>
                    <div id='opacidad' className='flex flex-row justify-between items-center opacity-50 hover:opacity-100 transition ease duration-500'>
                        <div className='px-2'>
                            <p className='a-boton-pq text-white'>Modo Claro</p>
                        </div>
                        <img src="/iconos/iconos-otros/icono-light.svg" alt="activar modo claro" className='w-5' />
                    </div>
                </div>
                {/* Pequeño: */}
                <div onClick={toggleTheme} className='mobile:block laptop:hidden rounded-full px-[7px] pt-[6px] pb-[2px] bg-[var(--brand2)] sombra-interior-light cursor-pointer'>
                    <div id='opacidad' className='flex flex-row justify-between items-center opacity-50 hover:opacity-100 transition ease duration-500'>
                        <div className='px-3'></div>
                        <img src="/iconos/iconos-otros/icono-light.svg" alt="activar modo claro" className='w-5' />
                    </div>
                </div>
            </>
        );
    }

}
