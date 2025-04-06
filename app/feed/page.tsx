
import { Metadata } from 'next';
import { Suspense } from 'react';
import ListaFeed from '@/components/cards/ListaFeed';
import Boton from '@/components/buttons/Boton';
import ListaSkeleton from '@/components/layout/panel/ListaSkeleton';
import Options from '@/components/inputs/Options';
import NubeTagsDinamica from '@/components/buttons/NubeTagsDinamica';

export const metadata: Metadata = {
    title: 'Feed',
};

export default async function Feed() {

    return (
        <div className="w-full h-100 flex flex-col items-center text-center mx-auto px-col1 pt-12 pb-32 gap-8">

            {/* CABECERA */}
            <div className="w-full flex flex-col items-center gap-4">
                <h1 className="text-center">Explora</h1>
                <p>Descubre, aprende y apasiónate por aquello que te hace especial.</p>
            </div>

            <div className='w-full flex flex-col items-center text-center gap-8 py-[2rem] bg-[#dfd8d8] dark:bg-[#2d2d2d] rounded-[1.4rem]'>

                {/* DROPDOWNS */}
                <div className='w-full flex flex-row items-center gap-4 px-col1'>
                    <Options
                        tipo='dropdown'
                        opciones={[
                            { id: 'todas', texto: 'Filtrar por categoría' },
                            { id: 'cat-2', texto: 'Categoría 2' },
                            { id: 'cat-3', texto: 'Categoría 3' },
                            { id: 'cat-4', texto: 'Categoría 4' },
                            { id: 'cat-5', texto: 'Categoría 5' },
                        ]}
                    />
                    <Options
                        tipo='dropdown'
                        opciones={[
                            { id: 'todas', texto: 'Usuarios que sigo' },
                            { id: 'cat-2', texto: 'Todos los usuarios' },
                        ]}
                    />
                    <Options
                        tipo='dropdown'
                        opciones={[
                            { id: 'todas', texto: 'Contenido verificado' },
                            { id: 'cat-2', texto: 'Todo el contenido' },
                            { id: 'cat-3', texto: 'Categoría 3' },
                            { id: 'cat-4', texto: 'Categoría 4' },
                            { id: 'cat-5', texto: 'Categoría 5' },
                        ]}
                    />
                </div>

                {/* TAGS */}
                <div className='w-full'>
                    <NubeTagsDinamica />
                </div>

            </div>

            {/* CONTENIDO */}
            <Suspense fallback={<ListaSkeleton />}>
                <ListaFeed />
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
