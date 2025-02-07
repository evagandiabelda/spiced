"use client";

import { useState, useEffect } from "react";
import ItemListaShare from "@/components/layout/panel/ItemListaShare";

interface Share {
  id: number;
  titulo: string;
  texto: string;
  img_principal: string;
  createdAt: string;
  user: {
    id: number;
    nombre_usuario: string;
  };
}

export default function ListaShares({ nombre_usuario }: { nombre_usuario: string }) {
  const [shares, setShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharesByUser = async () => {
      try {

        const response = await fetch(`/api/shares/${nombre_usuario}`);

        if (!response.ok) throw new Error("Error carregant els shares");

        const data: Share[] = await response.json();
        setShares(data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSharesByUser();

  }, [nombre_usuario]);

  if (loading) return <p>Cargando shares...</p>;

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
              usuario={nombre_usuario}
              titulo={share.titulo}
              fecha={share.createdAt} />
          ))}
        </ul>
      )}
    </div>
  );
}
