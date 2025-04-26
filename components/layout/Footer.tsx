"use client";

import { useSession } from "next-auth/react";
import React from 'react';
import Image from 'next/image';
import Logo from '@/components/icons/Logo';
import Menu from '@/components/layout/Menu';
import Boton from '@/components/buttons/Boton';

export default function Footer() {

    const { data: session } = useSession();

    const divClassname = 'hover:scale-110 transition ease';
    const iconClassname = 'dark:opacity-40 dark:hover:opacity-100 transition ease';

    return (
        <footer className="w-full -mt-4 -mb-5 flex flex-col gap-0 dark">

            <div className='flex flex-col justify-end items-center min-h-[16px] w-full m-0 p-0 overflow-hidden'>
                <img src="/iconos/iconos-genericos/wavy-footer.svg" alt="Inicio del footer" className='w-full min-w-[1920px] translate-y-[1px] object-cover' />
            </div>

            {/* Caja Principal del Footer: */}
            <div className='flex-col m-0 px-col1 py-8 m-0 gap-2 bg-[--negro]'>

                {/* Caja Superior: */}
                <div className='flex justify-left h-[100px] px-4 py-8 border-b-[1px] border-b-[var(--brand2)] dark:border-b-[var(--gris4)]'>
                    <Logo modo='oscuro' />
                </div>

                {/* Caja Central: */}
                <div className='flex mobile:flex-col laptop:flex-row justify-left px-4 py-10 gap-16 border-b-[1px] border-b-[var(--brand2)] dark:border-b-[var(--gris4)]'>
                    <div id='caja-izq' className='mobile:hidden tablet:block flex flex-row justify-left mobile:w-full laptop:w-col6'>
                        <Menu tipo='footer' />
                    </div>
                    <div id='caja-izq' className='mobile:block tablet:hidden flex flex-row justify-left mobile:w-full laptop:w-col6'>
                        <Menu tipo='footer-desplegable' />
                    </div>
                    <div id='caja-der' className='flex flex-col gap-12 mobile:w-full laptop:w-col4'>
                        <div className='flex felx-row gap-4 items-end'>
                            <a href="https://www.instagram.com" className={divClassname}>
                                <Image
                                    src="/iconos/iconos-redes-sociales/social-instagram.svg"
                                    width={24}
                                    height={24}
                                    alt="instagram"
                                    className={iconClassname}
                                />
                            </a>
                            <a href="https://www.facebook.com" className={divClassname}>
                                <Image
                                    src="/iconos/iconos-redes-sociales/social-facebook.svg"
                                    width={24}
                                    height={24}
                                    alt="facebook"
                                    className={iconClassname}
                                />
                            </a>
                            <a href="https://www.x.com" className={divClassname}>
                                <Image
                                    src="/iconos/iconos-redes-sociales/social-x.svg"
                                    width={24}
                                    height={24}
                                    alt="x"
                                    className={iconClassname}
                                />
                            </a>
                            <a href="https://www.pinterest.com" className={divClassname}>
                                <Image
                                    src="/iconos/iconos-redes-sociales/social-pinterest.svg"
                                    width={24}
                                    height={24}
                                    alt="pinterest"
                                    className={iconClassname}
                                />
                            </a>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <div className="flex flex-col gap-5">
                                <h3 className='text-white dark:text-[var(--gris2)]'>Ayuda y prevención contra el suicidio</h3>
                                <p className='text-[var(--brand2)] dark:text-[var(--gris3)]'>
                                    {session?.user.userType === "expert" ? "Participa en el programa voluntario para atender a pacientes en riesgo." : "No dudes en utilizar nuestro sistema gratuito 24/7 con profesionales voluntarios."}
                                </p>
                            </div>
                            <div>
                                <Boton texto={session?.user.userType === "expert" ? "Participar ahora" : "Necesito ayuda"} enlace={session?.user.userType === "expert" ? "/panel-experto/saps" : "/saps"} tamano='grande' jerarquia="primario" customColor='var(--brand1)' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Caja Inferior: */}
                <div className='flex justify-center px-4 py-8'>
                    <p className='text-[0.8rem] dark:text-[var(--gris3)]'>ⓒ Spiced. Creado con ❤ por y para gente neurospicy.</p>
                </div>

            </div>

        </footer>
    );
};