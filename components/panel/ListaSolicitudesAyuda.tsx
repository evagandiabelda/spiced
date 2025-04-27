"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ably from "@/lib/ably";

interface Solicitud {
    id: string;
    username: string;
    timestamp: number;
}

export default function ListaSolicitudesAyuda() {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Para manejar errores
    const router = useRouter();

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const res = await fetch("/api/chats");
                if (!res.ok) {
                    throw new Error("No se pudieron cargar las solicitudes.");
                }

                const data = await res.json();
                setSolicitudes(data);  // Guardamos las solicitudes obtenidas
            } catch (error: any) {
                setError(error.message);  // En caso de error, lo mostramos
            } finally {
                setIsLoading(false);  // Terminamos la carga
            }
        };

        fetchSolicitudes();

        const channel = ably.channels.get("solicitudes-ayuda");
        channel.subscribe("nueva-solicitud", (message) => {
            setSolicitudes((prev) => [...prev, message.data]);
        });

        return () => {
            channel.unsubscribe("nueva-solicitud");
        };
    }, []);

    const handleUnirseAlChat = async (solicitudId: string) => {
        const chatChannelName = `chat-ayuda-${solicitudId}`;
        const chatChannel = ably.channels.get(chatChannelName);

        try {
            // Entrar como Expert al canal de chat
            await chatChannel.presence.enter({ role: "expert" });

            // Redirigir al chat
            router.push(`/panel-experto/saps/chat/${solicitudId}`);
        } catch (error) {
            console.error("Error al unirse al canal de chat:", error);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <h3>Solicitudes de Ayuda Activas</h3>

            {solicitudes.length === 0 ? (
                <p>No hay solicitudes activas ahora mismo.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {solicitudes.map((solicitud) => (
                        <li
                            key={solicitud.id}
                            className="flex justify-between items-center p-4 border rounded-md"
                        >
                            <div>
                                <p><strong>ID:</strong> {solicitud.id}</p>
                                <p className="text-sm text-gray-500">
                                    Recibido: {new Date(solicitud.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={() => handleUnirseAlChat(solicitud.id)}
                            >
                                Unirse al Chat
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
