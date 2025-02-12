"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextProps {
    language: Language;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>("es");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "es" ? "en" : "es"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
    }
    return context;
};
