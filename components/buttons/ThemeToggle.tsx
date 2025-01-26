'use client';

import { useTheme } from '@/context/ThemeContext';

type ThemeToggleProps = {
    tamano: "grande" | "pequeno";
};


export default function ThemeToggle({ tamano }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (theme === "light" && tamano === "grande") {
        return (
            <div onClick={toggleTheme} className='rounded-full px-[7px] py-[4px] bg-[var(--gris4)] sombra-interior-dark cursor-pointer'>
                <div id='opacidad' className='flex flex-row justify-between items-center opacity-50 hover:opacity-100 transition ease duration-500'>
                    <img src="/iconos/iconos-otros/icono-dark.svg" alt="activar modo oscuro" className='w-5' />
                    <div className='px-2'>
                        <p className='a-boton-pq text-white'>Modo Oscuro</p>
                    </div>
                </div>
            </div>
        );
    }

    if (theme === "light" && tamano === "pequeno") {
        return (
            <div onClick={toggleTheme} className='rounded-full px-[7px] pt-[6px] pb-[2px] bg-[var(--gris4)] sombra-interior-dark cursor-pointer'>
                <div id='opacidad' className='flex flex-row justify-between items-center opacity-50 hover:opacity-100 transition ease duration-500'>
                    <img src="/iconos/iconos-otros/icono-dark.svg" alt="activar modo oscuro" className='w-5' />
                    <div className='px-3'></div>
                </div>
            </div>
        );
    }

    if (theme === "dark" && tamano === "grande") {
        return (
            <div onClick={toggleTheme} className='rounded-full px-[7px] py-[4px] bg-[var(--brand2)] sombra-interior-light cursor-pointer'>
                <div id='opacidad' className='flex flex-row justify-between items-center opacity-50 hover:opacity-100 transition ease duration-500'>
                    <div className='px-2'>
                        <p className='a-boton-pq text-white'>Modo Claro</p>
                    </div>
                    <img src="/iconos/iconos-otros/icono-light.svg" alt="activar modo claro" className='w-5' />
                </div>
            </div>
        );
    }

    if (theme === "dark" && tamano === "pequeno") {
        return (
            <div onClick={toggleTheme} className='rounded-full px-[7px] pt-[6px] pb-[2px] bg-[var(--brand2)] sombra-interior-light cursor-pointer'>
                <div id='opacidad' className='flex flex-row justify-between items-center opacity-50 hover:opacity-100 transition ease duration-500'>
                    <div className='px-3'></div>
                    <img src="/iconos/iconos-otros/icono-light.svg" alt="activar modo claro" className='w-5' />
                </div>
            </div>
        );
    }


}
