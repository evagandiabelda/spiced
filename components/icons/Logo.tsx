'use client';

type modo = {
    // Valores aceptados:
    modo?: "claro" | "oscuro";
};

export default function Logo({ modo }: modo) {

    /* COMPORTAMIENTO POR DEFECTO: */

    if (!modo) {
        return (
            <a href="/">
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
    }

    /* COMPORTAMIENTO PERSONALIZADO: */

    if (modo === "claro") {
        return (
            <a href="/">
                <img
                    src="/logos/logo-spiced-pos.svg"
                    alt="Logotipo"
                    className="w-full max-h-full object-contain mx-auto" // Visible en modo claro
                />
            </a>

        );
    }

    if (modo === "oscuro") {
        return (
            <a href="/">
                <img
                    src="/logos/logo-spiced-neg.svg"
                    alt="Logotipo en modo oscuro"
                    className="w-full max-h-full object-contain mx-auto" // Visible en modo oscuro
                />
            </a>
        );
    }

};
