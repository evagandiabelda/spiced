"use client";

import { useEffect } from "react";

const ThemeInitializer = () => {
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("dark");
        root.classList.add("light");
    }, []);

    return null; // Este componente no renderiza nada
};

export default ThemeInitializer;
