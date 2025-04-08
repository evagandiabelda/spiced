"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import ListaFeed from '@/components/cards/ListaFeed';
import ListaSkeleton from '@/components/layout/panel/ListaSkeleton';
import Options from '@/components/inputs/Options';
import NubeTagsDinamica from '@/components/buttons/NubeTagsDinamica';

type Categoria = {
    id: string;
    nombre: string;
}

export default function Feed() {
    const { data: session } = useSession();

    const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
    const [filtroUsuarios, setFiltroUsuarios] = useState<'seguidos' | 'todos'>('todos');
    const [filtroVerificados, setFiltroVerificados] = useState<'verificados' | 'todos'>('todos');

    // Obtener las categorías en la BD:

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await fetch('/api/categorias');
                if (!res.ok) throw new Error('Error al obtener categorías.');
                const data = await res.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al cargar las categorías.', error);
            }
        };

        fetchCategorias();
    }, []);

    const opcionesCategoria = [
        // La primera opción será sin filtrar:
        { id: 'todas', texto: 'Filtrar por categoría' },
        // El resto de opciones corresponderán a cada categoría:
        ...categorias.map((cat) => ({
            id: cat.id,
            texto: cat.nombre
        }))
    ];

    // Callback para manejar los Spices seleccionados en la nube de tags:
    // (necesitamos recoger los tags seleccionados dentro de "NubeTagsDinamica" para poder filtrar luego los Shares en "ListaFeed")

    const [tagsSeleccionados, setTagsSeleccionados] = useState<string[]>([]);

    // Manejar la selección de tags
    const manejarSeleccionDeTags = (tags: string[]) => {
        setTagsSeleccionados(tags);
    };

    return (
        <div className='w-full flex flex-col items-center gap-8'>

            {/* FILTROS */}

            <div className='w-full flex flex-col items-center text-center gap-8 py-3'>

                {/* DROPDOWNS */}
                <div className='w-full flex flex-row items-center gap-4 mobile:px-col1 laptop:px-col2'>
                    <Options
                        tipo='dropdown'
                        opciones={opcionesCategoria}
                        valorSeleccionado={filtroCategoria}
                        onChange={(nuevoValor) => setFiltroCategoria(nuevoValor)}
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
                    <NubeTagsDinamica
                        defaultActive={true}
                        onSeleccionarTags={manejarSeleccionDeTags} // Pasa la función de callback
                        tagsSeleccionados={tagsSeleccionados} // Pasa los tags seleccionados
                    />
                </div>

            </div>

            {/* SHARES */}

            <Suspense fallback={<ListaSkeleton />}>
                <ListaFeed
                    filtroCategoria={filtroCategoria}
                    filtroUsuarios={filtroUsuarios}
                    filtroVerificados={filtroVerificados}
                    filtroSpices={tagsSeleccionados}
                />
            </Suspense>

        </div>
    );
}
