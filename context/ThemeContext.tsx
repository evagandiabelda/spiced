'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => { }, // Valor inicial (se sobreescribe en el provider)
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [isMounted, setIsMounted] = useState(false);

    // Evitar que se aplique el tema hasta que estemos en cliente
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const html = document.documentElement;
        html.classList.remove('light', 'dark');
        html.classList.add(theme);
        html.style.colorScheme = theme;
        localStorage.setItem('theme', theme);
    }, [theme, isMounted]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {/* Espera a montar antes de renderizar hijos */}
            {isMounted ? children : null}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
