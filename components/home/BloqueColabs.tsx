'use client';

import Image from "next/image";

export default function BloqueColabs() {
    return (
        <div className="w-full flex flex-col items-center px-col1 gap-8">
            <div className="w-full border-b border-b-[var(--gris5)] py-8">
                <h3>Conoce a nuestros colaboradores</h3>
            </div>
            <div className="w-full flex mobile:flex-col tablet:flex-row justify-center items-center gap-10">
                <a href="https://consaludmental.org/" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/logos/logos-colaboradores/logo-confederacion-salud-mental.png"
                        alt="icono Spiced"
                        width="180"
                        height="90"
                        className="dark:invert"
                    />
                </a>
                <a href="https://www.fundacionmanantial.org/" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/logos/logos-colaboradores/logo-fundacion-manantial.png"
                        alt="icono Spiced"
                        width="180"
                        height="90"
                        className="dark:invert"
                    />
                </a>
                <a href="https://aen.es/" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/logos/logos-colaboradores/logo-aen.png"
                        alt="icono Spiced"
                        width="90"
                        height="90"
                        className="dark:invert"
                    />
                </a>
                <a href="https://www.iasp.info/" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/logos/logos-colaboradores/logo-iasp.png"
                        alt="icono Spiced"
                        width="180"
                        height="90"
                        className="dark:invert"
                    />
                </a>
            </div>
        </div>
    );
}
