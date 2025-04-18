"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from 'next/navigation';
import ListaFeed from '@/components/cards/ListaFeed';
import ListaSkeleton from '@/components/layout/panel/ListaSkeleton';
import Options from '@/components/inputs/Options';
import NubeTagsDinamica from '@/components/buttons/NubeTagsDinamica';
import Boton from '@/components/buttons/Boton';

type Categoria = {
    id: string;
    nombre: string;
}

export default function Feed() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();

    // Lee los filtros desde los parámetros de la URL (por ejemplo, si queremos filtrar automáticamentee desde uno de los enlaces del Footer):
    const filtroUsuarios = searchParams.get('usuarios') === 'siguiendo' ? 'siguiendo' : 'todos';
    const filtroVerificados = searchParams.get('verificados') === 'verificados' ? 'verificados' : 'todos';
    const filtroCategoria = searchParams.get('categoria') || '';
    const filtroSpices = searchParams.get('spices') ? searchParams.get('spices')!.split(',') : [];

    // Obtener las categorías en la BD:

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    // Callback para manejar los Spices seleccionados en la nube de tags:
    // (necesitamos recoger los tags seleccionados dentro de "NubeTagsDinamica" para poder filtrar luego los Shares en "ListaFeed")
    const [tagsSeleccionados, setTagsSeleccionados] = useState<string[]>(filtroSpices);

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
        { id: 'todas', nombre: 'Todas las categorías' },
        // El resto de opciones corresponderán a cada categoría:
        ...categorias.map((cat) => ({
            id: cat.nombre, // Para que construya la URL en base al nombre y no a un ID.
            nombre: cat.nombre
        }))
    ];

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
                        onChange={(nuevoValor) => router.push(`/explorar?categoria=${nuevoValor}`)}
                    />
                    {/* Este filtro solo se renderiza si el usuario está autenticado: */}
                    {session && (
                        <Options
                            tipo='dropdown'
                            opciones={[
                                { id: 'todos', nombre: 'Todos los usuarios' },
                                { id: 'siguiendo', nombre: 'Usuarios que sigo' },
                            ]}
                            valorSeleccionado={filtroUsuarios}
                            onChange={(nuevoValor) => router.push(`/explorar?usuarios=${nuevoValor}`)}
                        />
                    )}
                    <Options
                        tipo='dropdown'
                        opciones={[
                            { id: 'todos', nombre: 'Todos los Shares' },
                            { id: 'verificados', nombre: 'Shares verificados' },
                        ]}
                        valorSeleccionado={filtroVerificados}
                        onChange={(nuevoValor) => router.push(`/explorar?verificados=${nuevoValor}`)}
                    />
                </div>

                {/* TAGS */}
                <div className='w-full'>
                    <NubeTagsDinamica
                        uso='feed'
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

            {/* ACCIÓN CIERRE */}
            <div className='flex flex-col gap-8 pt-16'>
                <p>¡Esto es todo! ¿Te animas a publicar tu propio Share?</p>
                {session?.user.userType !== "admin" &&
                    <div>
                        <Boton
                            texto="Nuevo Share"
                            enlace={session?.user.userType === "expert" ? "/panel-experto/nuevo-share" : "/panel-estandar/nuevo-share"}
                            tamano='grande'
                            jerarquia='secundario'
                        />
                    </div>
                }
            </div>

        </div>
    );
}
