
import { Metadata } from 'next';
import { Suspense } from 'react';
import ListaShares from '@/components/cards/ListaShares';
import Boton from '@/components/buttons/Boton';
import ListaSkeleton from '@/components/layout/panel/ListaSkeleton';

export const metadata: Metadata = {
    title: 'Feed',
};

export default async function Feed() {

    return (
        <div className="w-full h-100 flex flex-col items-center text-center mx-auto px-col1 pt-16 pb-32 gap-14">
            {/* CABECERA */}
            <div className="w-full flex flex-col items-center gap-8">
                <h1 className="text-center">Explora</h1>
                <p>Descubre, aprende y apasiónate por aquello que te hace especial.</p>
            </div>

            {/* CONTENIDO */}
            <Suspense fallback={<ListaSkeleton />}>
                <ListaShares />
            </Suspense>


            {/* ACCIÓN CIERRE */}
            <div className='flex flex-col gap-8'>
                <p>¡Esto es todo! ¿Te animas a publicar tu propio Share?</p>
                <div>
                    <Boton
                        texto="Nuevo Share"
                        enlace="/panel-estandar/nuevo-share"
                        tamano='grande'
                        jerarquia='secundario'
                    />
                </div>
            </div>
        </div>
    );
}
