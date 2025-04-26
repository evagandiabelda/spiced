"use client";

import { useState, useEffect } from "react";
import ablyClient from "@/lib/ably";
import { useRouter } from "next/navigation";

// Definimos un tipo adecuado para la solicitud
interface Solicitud {
    channelId: string;
    timestamp: string;
}

// Definimos el tipo para el miembro en presence (en este caso, el Standard)
interface PresenceMember {
    data: {
        channelId: string;
    };
}

export default function ListaSolicitudesAyuda() {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const router = useRouter();

    useEffect(() => {
        const solicitudesChannel = ablyClient.channels.get("solicitudes-ayuda");

        // Al recibir una nueva solicitud
        const handlePresenceEnter = (member: PresenceMember) => {
            if (member?.data?.channelId) {
                const nuevaSolicitud: Solicitud = {
                    channelId: member.data.channelId,
                    timestamp: new Date().toISOString(), // Usamos la fecha actual
                };
                setSolicitudes((prev) => [...prev, nuevaSolicitud]);
            }
        };

        // Primero suscribimos a nuevos "enter"
        solicitudesChannel.presence.subscribe("enter", handlePresenceEnter);

        // Obtener las solicitudes presentes cuando el componente se monta
        const fetchPresentMembers = async () => {
            try {
                const members = await solicitudesChannel.presence.get();
                const solicitudesIniciales = members.map((member: PresenceMember) => ({
                    channelId: member.data.channelId,
                    timestamp: new Date().toISOString(), // Usamos la fecha actual
                }));

                setSolicitudes(solicitudesIniciales);
            } catch (error) {
                console.error("Error al obtener miembros presentes:", error);
            }
        };

        fetchPresentMembers();

        // Cleanup al desmontar el componente
        return () => {
            solicitudesChannel.presence.unsubscribe("enter", handlePresenceEnter);
        };
    }, []);

    const handleUnirseChat = (channelId: string) => {
        router.push(`/dashboard/expert/chat/${channelId}`);
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
                            key={solicitud.channelId}
                            className="flex justify-between items-center p-4 border rounded-md"
                        >
                            <div>
                                <p><strong>ID:</strong> {solicitud.channelId}</p>
                                <p className="text-sm text-gray-500">
                                    Recibido: {new Date(solicitud.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={() => handleUnirseChat(solicitud.channelId)}
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
