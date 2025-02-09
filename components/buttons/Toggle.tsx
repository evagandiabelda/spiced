'use client';

import Image from 'next/image';

export default function Toggle() {

    return (
        <div className='rounded-full px-[8px] pt-[5px] pb-[6px] bg-[var(--gris4)] sombra-interior-dark cursor-pointer'>
            <div id='opacidad' className='flex flex-row justify-between items-center pt-[2px]'>
                <Image
                    src="/iconos/iconos-otros/icono-light.svg"
                    width={20}
                    height={20}
                    alt="cambiar"
                    className='invert'
                />
                <div className='px-3'></div>
            </div>
        </div>
    );

}
