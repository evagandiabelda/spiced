"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import ListaFeed from '@/components/cards/ListaFeed';
import ListaSkeleton from '@/components/layout/panel/ListaSkeleton';
import Options from '@/components/inputs/Options';
import NubeTagsDinamica from '@/components/buttons/NubeTagsDinamica';

export default function Feed() {
    const { data: session } = useSession();

    const [filtroUsuarios, setFiltroUsuarios] = useState<'seguidos' | 'todos'>('todos');
    const [filtroVerificados, setFiltroVerificados] = useState<'verificados' | 'todos'>('todos');

    return (
        <div className='w-full flex flex-col items-center gap-8'>

            {/* FILTROS */}

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
                    {/* Este filtro solo se renderiza si el usuario está autenticado: */}
                    {session && (
                        <Options
                            tipo='dropdown'
                            opciones={[
                                { id: 'seguidos', texto: 'Usuarios que sigo' },
                                { id: 'todos', texto: 'Todos los usuarios' },
                            ]}
                            valorSeleccionado={filtroUsuarios}
                            onChange={(nuevoValor) => setFiltroUsuarios(nuevoValor as "seguidos" | "todos")}
                        />
                    )}
                    <Options
                        tipo='dropdown'
                        opciones={[
                            { id: 'verificados', texto: 'Contenido verificado' },
                            { id: 'todos', texto: 'Todo el contenido' },
                        ]}
                        valorSeleccionado={filtroVerificados}
                        onChange={(nuevoValor) => setFiltroVerificados(nuevoValor as "verificados" | "todos")}
                    />
                </div>

                {/* TAGS */}
                <div className='w-full'>
                    <NubeTagsDinamica />
                </div>

            </div>

            {/* SHARES */}

            <Suspense fallback={<ListaSkeleton />}>
                <ListaFeed
                    filtroUsuarios={filtroUsuarios}
                    filtroVerificados={filtroVerificados}
                />
            </Suspense>

        </div>
    );
}
