"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ably from "@/lib/ably";
import Boton from "@/components/buttons/Boton";

interface Solicitud {
    username: string,
    timestamp: Date,
    channelId: string,
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
            console.log(message)
            setSolicitudes((prev) => [...prev, message.data]);
        });

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
                    {solicitudes.map((solicitud, index) => (
                        solicitud.username &&
                        <li
                            key={index}
                            className="w-full flex justify-between items-center px-8 py-6 bg-white rounded-xl"
                        >
                            <div>
                                <p><strong>ID:</strong> {solicitud.username}</p>
                                <p className="text-sm text-gray-500">
                                    Recibido: {new Date(solicitud.timestamp).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
                                </p>
                            </div>
                            <Boton
                                texto="Unirse al Chat"
                                tamano="grande"
                                jerarquia="primario"
                                onClick={() => handleUnirseAlChat(solicitud.channelId)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
