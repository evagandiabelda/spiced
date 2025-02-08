"use client";

import React from 'react';
import Image from 'next/image';
import Logo from '@/components/icons/Logo';
import Menu from '@/components/layout/Menu';
import Boton from '@/components/buttons/Boton';

const Footer = () => {

    return (
        <footer className="w-full -mt-4 -mb-5 flex flex-col gap-0 dark">

            <div className='flex flex-col justify-end items-center min-h-[16px] w-full m-0 p-0 overflow-hidden'>
                <img src="/iconos/iconos-genericos/wavy-footer.svg" alt="Inicio del footer" className='translate-y-[1px] min-w-[1920px] object-cover' />
            </div>

            {/* Caja Principal del Footer: */}
            <div className='flex-col m-0 px-col1 py-8 m-0 gap-2 bg-[--negro]'>

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
                    <div id='caja-der' className='flex flex-col gap-9 mobile:w-full laptop:w-col4'>
                        <div className='flex felx-row gap-4 items-end'>
                            <a href="https://www.instagram.com" className='hover:scale-110 transition ease'>
                                <Image
                                    src="/iconos/iconos-redes-sociales/social-instagram.svg"
                                    width={24}
                                    height={24}
                                    alt="instagram"
                                />
                            </a>
                            <a href="https://www.facebook.com" className='hover:scale-110 transition ease'>
                                <Image
                                    src="/iconos/iconos-redes-sociales/social-facebook.svg"
                                    width={24}
                                    height={24}
                                    alt="facebook"
                                />
                            </a>
                            <a href="https://www.x.com" className='hover:scale-110 transition ease'>
                                <Image
                                    src="/iconos/iconos-redes-sociales/social-x.svg"
                                    width={24}
                                    height={24}
                                    alt="x"
                                />
                            </a>
                            <a href="https://www.pinterest.com" className='hover:scale-110 transition ease'>
                                <Image
                                    src="/iconos/iconos-redes-sociales/social-pinterest.svg"
                                    width={24}
                                    height={24}
                                    alt="pinterest"
                                />
                            </a>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className="flex flex-col gap-3">
                                <h4>Ayuda y prevención contra el suicidio</h4>
                                <p className='text-[var(--brand2)]'>No dudes en utilizar nuestro chat en vivo 24/7 y gratuito, con profesionales voluntarios y totalmente anónimo.</p>
                            </div>
                            <div>
                                <Boton texto='Necesito ayuda' enlace='#' tamano='grande' jerarquia="primario" customColor='var(--brand1)' />
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
