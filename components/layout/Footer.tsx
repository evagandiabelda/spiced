"use client";

import React from 'react';
import Logo from '@/components/icons/Logo';
import Menu from '@/components/layout/Menu';
import Boton from '@/components/Boton';

interface FooterProps {

}

const Footer = () => {

    return (
        <footer className="w-full -mt-4 -mb-5 flex flex-col gap-0 dark">

            <div className='h-[9px] w-full m-0 p-0'>
                <img src="/iconos/iconos-genericos/wavy-footer.svg" alt="Inicio del footer" className='h-full object-cover' />
            </div>

            {/* Caja Principal del Footer: */}
            <div className='flex-col m-0 px-col1 py-8 gap-2 bg-[--negro]'>

                {/* Caja Superior: */}
                <div className='flex justify-left h-[100px] px-4 py-8 border-b-[1px] border-b-[var(--brand2)]'>
                    <Logo modo='oscuro' />
                </div>

                {/* Caja Central: */}
                <div className='flex mobile:flex-col laptop:flex-row justify-left px-4 py-10 gap-16 border-b-[1px] border-b-[var(--brand2)]'>
                    <div id='caja-izq' className='mobile:hidden tablet:block flex flex-row justify-left mobile:w-full laptop:w-col6'>
                        <Menu tipo='footer' />
                    </div>
                    <div id='caja-izq' className='mobile:block tablet:hidden flex flex-row justify-left mobile:w-full laptop:w-col6'>
                        <Menu tipo='footer-desplegable' />
                    </div>
                    <div id='caja-der' className='flex flex-col gap-8 mobile:w-full laptop:w-col4'>
                        <div className='flex felx-row gap-3'>
                            <img src="/iconos/iconos-redes-sociales/social-instagram.svg" alt="Instagram" className='w-[24px]' />
                            <img src="/iconos/iconos-redes-sociales/social-facebook.svg" alt="Facebook" className='w-[24px]' />
                            <img src="/iconos/iconos-redes-sociales/social-x.svg" alt="X" className='w-[24px]' />
                            <img src="/iconos/iconos-redes-sociales/social-pinterest.svg" alt="Pinterest" className='w-[24px]' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div>
                                <h4>Ayuda y prevención contra el suicidio</h4>
                                <p className='text-[var(--brand2)]'>No dudes en utilizar nuestro chat en vivo 24/7 y gratuito, con profesionales voluntarios y totalmente anónimo.</p>
                            </div>
                            <div>
                                <Boton texto='Necesito ayuda' enlace='#' modo='oscuro' tamano='grande' jerarquia='primario' customColor='var(--brand1)' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Caja Inferior: */}
                <div className='flex justify-center px-4 py-8'>
                    <p className='text-[0.8rem]'>ⓒ Spiced. Creado con ❤ por y para gente neurospicy.</p>
                </div>

            </div>

        </footer>
    );
};

export default Footer;
