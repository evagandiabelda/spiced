"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ListaSkeleton from "@/components/layout/panel/ListaSkeleton";
import ItemListaShare from "@/components/layout/panel/ItemListaShare";

interface Share {
  id: string;
  titulo: string;
  texto: string;
  img_principal: string;
  created_at: Date;
  slug: string;
  user: {
    id: number;
    name: string;
  };
}

export default function ListaShares() {
  const { data: session } = useSession(); // Obtener sesión
  const [shares, setShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharesByUser = async () => {
      if (!session?.user?.name) return; // Evitar la llamada si no hay usuario autenticado

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/users/${session.user.name}`);
        if (!response.ok) {
          throw new Error("Error al recuperar los datos");
        }

        const shares: Share[] = await response.json();

        if (shares.length === 0) {
          setError("Todavía no has publicado ningún share.");
          setShares([]);
        } else {
          setShares(shares);
        }
      } catch (error) {
        setError("Error cargando los shares.");
      } finally {
        setLoading(false);
      }
    };

    fetchSharesByUser();
  }, [session?.user?.name]); // Se ejecuta solo cuando el usuario cambia

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/shares/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el share");
      }

      // Actualizar el estado eliminando el share de la lista
      setShares((prevShares) => prevShares.filter((share) => share.id !== id));
    } catch (error) {
      console.error(error);
      alert("Hubo un error al eliminar el share.");
    }
  };

  if (!session?.user) return <p>Debes iniciar sesión para ver tus shares.</p>;
  if (error) return <p>{error}</p>;

  if (loading) return (
    <div className="w-full flex flex-col gap-8 p-[30px] rounded-xl bg-white dark:bg-[var(--gris4)]">
      <ListaSkeleton />
      <ListaSkeleton />
      <ListaSkeleton />
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-8 px-[30px] pt-[10px] pb-[24px] rounded-xl bg-white dark:bg-[var(--gris5)] dark:border-2 dark:border-[var(--borde-shares)]">
      {shares.length === 0 ? (
        <p>Todavía no hay shares por aquí...</p>
      ) : (
        <ul>
          {shares.map((share) => (
            <ItemListaShare
              id={share.id}
              key={share.id}
              imagen={share.img_principal}
              user={session.user!.name} // Aquí usamos "!" porque ya verificamos antes que está definido
              titulo={share.titulo}
              fecha={share.created_at as Date}
              slug={share.slug}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
