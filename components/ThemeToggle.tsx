'use client';

// COMPONENTE PARA CAMBIAR EL TEMA:

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button onClick={toggleTheme}>
            Cambiar a {theme === 'dark' ? 'modo claro' : 'modo oscuro'}
        </button>
    );
}
