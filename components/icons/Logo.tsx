'use client';

const Logo = () => {
    return (
        <a href="/">
            {/* Cambia la imagen según la clase `dark` */}
            <img
                src="/logos/logo-spiced-pos.svg"
                alt="Logotipo"
                className="w-full max-h-full object-contain mx-auto dark:hidden" // Visible en modo claro
            />
            <img
                src="/logos/logo-spiced-neg.svg"
                alt="Logotipo en modo oscuro"
                className="w-full max-h-full object-contain mx-auto hidden dark:block" // Visible en modo oscuro
            />
        </a>
    );
};

export default Logo;
