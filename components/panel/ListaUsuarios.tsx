"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ListaSkeleton from "@/components/panel/ListaSkeleton";
import { UserData } from "@/types/user";
import ItemListaUsuario from "@/components/panel/ItemListaUsuario";

interface ListaUsuariosProps {
    numItems?: number;
}

export default function ListaUsuarios({ numItems }: ListaUsuariosProps) {
    const { data: session } = useSession();
    const [usuarios, setUsuarios] = useState<UserData[]>([]);
    const [denunciasRecibidasPorUsuario, setDenunciasRecibidasPorUsuario] = useState<{ [userId: string]: number }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!session?.user?.name) return; // Evitar la llamada si no hay usuario autenticado

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/users`);
                if (!response.ok) {
                    throw new Error("Error al recuperar los usuarios.");
                }

                const data = await response.json();
                const users: UserData[] = data.users;

                // Obtener el número total de denuncias recibidas por cada usuario:
                const usuariosConDenuncias: { userId: string, totalDenunciasRecibidas: number }[] = data.usuariosConDenuncias;

                // Convertir a un objeto para acceso rápido por ID
                const mapaDenuncias = usuariosConDenuncias.reduce((acc, item) => {
                    acc[item.userId] = item.totalDenunciasRecibidas;
                    return acc;
                }, {} as { [userId: string]: number });

                // Eliminar del array los usuarios que no sean admin:
                const filteredUsers = users.filter((user) => !user.is_admin);

                if (filteredUsers.length === 0) {
                    setError("Todavía no se ha registrado ningún usuario.");
                    setUsuarios([]);
                } else {

                    if (!numItems) {
                        numItems = users.length;
                    }

                    setUsuarios(filteredUsers);

                    setDenunciasRecibidasPorUsuario(mapaDenuncias);
                }

            } catch (error) {
                setError("Error cargando los usuarios.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [session?.user?.name]); // Se ejecuta solo cuando el usuario cambia

    const handleDelete = async (name: string, id: string) => {
        try {
            const res = await fetch(`/api/users/${name}?id=${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Error al eliminar el usuario");
            }

            // Actualizar el estado eliminando el share de la lista
            setUsuarios((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error(error);
            alert("Hubo un error al eliminar el usuario.");
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
        <div className="w-full flex flex-col gap-8 px-4 pt-[10px] pb-[24px] rounded-xl bg-white dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--borde-shares)]">
            {usuarios.length === 0 ? (
                <p>Todavía no hay shares por aquí...</p>
            ) : (
                <ul>
                    {usuarios.slice(0, numItems).map((usuario) => (
                        <ItemListaUsuario
                            id={usuario.id}
                            key={usuario.id}
                            name={usuario.name}
                            foto={usuario.foto}
                            usuario_verificado={usuario.usuario_verificado}
                            fecha={usuario.created_at as Date}
                            numShares={usuario.shares_publicados.length}
                            numComentarios={usuario.comentarios.length}
                            numSeguidores={usuario.seguidores.length}
                            numCategorias={usuario.categorias_seguidas.length}
                            numSpices={usuario.spices_seguidos.length}
                            numDenunciasHechas={usuario.denuncias_comentarios.length + usuario.denuncias_shares.length}
                            numDenunciasRecibidas={denunciasRecibidasPorUsuario[usuario.id] || 0}
                            onDelete={() => handleDelete(usuario.name, usuario.id)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
