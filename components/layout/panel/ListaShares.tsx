"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ItemListaShare from "@/components/layout/panel/ItemListaShare";

interface Share {
  id: number;
  titulo: string;
  texto: string;
  img_principal: string;
  createdAt: string;
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

        const data: Share[] = await response.json();

        if (data.length === 0) {
          setError("Todavía no has publicado ningún share.");
          setShares([]);
        } else {
          setShares(data);
        }
      } catch (error) {
        setError("Error cargando los shares.");
      } finally {
        setLoading(false);
      }
    };

    fetchSharesByUser();
  }, [session?.user?.name]); // Se ejecuta solo cuando el usuario cambia

  if (!session?.user) return <p>Debes iniciar sesión para ver tus shares.</p>;
  if (loading) return <p>Cargando shares...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full flex flex-col gap-8 px-[30px] py-[10px] rounded-xl bg-white dark:bg-[var(--gris4)]">
      {shares.length === 0 ? (
        <p>Todavía no hay shares por aquí...</p>
      ) : (
        <ul>
          {shares.map((share) => (
            <ItemListaShare
              key={share.id}
              imagen={share.img_principal}
              user={session.user!.name} // Aquí usamos "!" porque ya verificamos antes que está definido
              titulo={share.titulo}
              fecha={share.createdAt}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
