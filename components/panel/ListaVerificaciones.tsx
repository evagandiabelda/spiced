"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import ListaSkeleton from "@/components/panel/ListaSkeleton";
import ItemListaVerificacion from "@/components/panel/ItemListaVerificacion";

/* MUESTRA EL LISTADO DE VERIFICACIONES PENDIENTES (Panel de Admin) */

type ExpertData = {
    id: string;
    nombre_real: string;
    name: string;
    foto: string;
    created_at: Date;
    expert: {
        num_colegiado: string;
        anyos_experiencia: number;
        lista_titulaciones: string[];
    }
}

interface ListaUsuariosProps {
    numItems?: number;
}

export default function ListaVerificaciones({ numItems }: ListaUsuariosProps) {
    const { data: session } = useSession();
    const [usuarios, setUsuarios] = useState<ExpertData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (session?.user.userType !== "admin") return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/users/verificaciones`);
                if (!response.ok) {
                    throw new Error("Error al recuperar las verificaciones pendientes.");
                }

                const data = await response.json();
                const users: ExpertData[] = data.users;

                if (users.length === 0) {
                    setError("No hay verificaciones pendientes.");
                    setUsuarios([]);
                } else {
                    if (!numItems) {
                        numItems = users.length;
                    }
                    setUsuarios(users);
                }

            } catch (error) {
                setError("Error cargando las verificaciones pendientes.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [session?.user?.name]);

    const handleVerificar = async (id: string) => {

        try {
            const res = await fetch(`/api/users/verificaciones/${id}`, {
                method: "PATCH",
            });

            if (!res.ok) {
                throw new Error("Error al verificar el usuario");
            }

            // Actualizar el estado eliminando el usuario verificado de la lista de pendientes:
            setUsuarios((prevUsers) => prevUsers.filter((user) => user.id !== id));

            toast.success("Usuario verificado.");

        } catch (error) {
            toast.error("Hubo un error al verificar el usuario.");
        }
    };

    if (error) return <p>{error}</p>;

    if (loading) return (
        <div className="w-full flex flex-col gap-8 p-[30px] rounded-xl bg-white dark:bg-[var(--gris4)]">
            <ListaSkeleton />
            <ListaSkeleton />
            <ListaSkeleton />
        </div>
    );

    return (
        <div className="w-full flex flex-col gap-8 px-4 pt-[10px] pb-[24px] rounded-xl bg-white dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--gris4)]">
            {usuarios.length === 0 ? (
                <p className="pt-6 px-4">No hay verificaciones pendientes.</p>
            ) : (
                <ul>
                    {usuarios.slice(0, numItems).map((usuario) => (
                        <ItemListaVerificacion
                            key={usuario.id}
                            id={usuario.id}
                            nombre_real={usuario.nombre_real}
                            name={usuario.name}
                            foto={usuario.foto}
                            created_at={usuario.created_at}
                            num_colegiado={usuario.expert.num_colegiado}
                            anyos_experiencia={usuario.expert.anyos_experiencia}
                            lista_titulaciones={usuario.expert.lista_titulaciones}
                            onVerificar={handleVerificar}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
