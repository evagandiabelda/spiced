'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Logo = () => {
    const { theme } = useTheme();
    const [logoSrc, setLogoSrc] = useState('/logos/logo-spiced-pos.svg'); // Valor por defecto

    useEffect(() => {
        if (theme === 'dark') {
            setLogoSrc('/logos/logo-spiced-neg.svg');
        } else {
            setLogoSrc('/logos/logo-spiced-pos.svg');
        }
    }, [theme]);

    return (
        <a href="#">
            <img
                src={logoSrc}
                alt="Logotipo"
                className="w-full max-h-full object-contain mx-auto"
            />
        </a>
    );
};

export default Logo;
