"use client";

import { useState, useEffect } from "react";
import ablyClient, { clientId } from "@/lib/ably"
import { motion } from "framer-motion";
import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface Message {
    text: string;
    sender: "standard" | "expert" | "sistema";
    clientId: string;
}

export default function SapsForm() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [channelId, setChannelId] = useState<string | null>(null);
    const [isInPresence, setIsInPresence] = useState(false);

    // Publicar la solicitud de chat para que la puedan ver los Experts:
    useEffect(() => {
        const setupChannel = async () => {
            let storedChannelId = localStorage.getItem("chat-channel-id");

            if (!storedChannelId) {
                storedChannelId = crypto.randomUUID();
                localStorage.setItem("chat-channel-id", storedChannelId);

                const solicitudesChannel = ablyClient.channels.get("solicitudes-ayuda");

                // Enviar un mensaje al canal cuando un usuario se une
                solicitudesChannel.publish("nueva-solicitud", {
                    username: clientId, // Usar datos relevantes como el username
                    timestamp: Date.now(),
                    channelId: storedChannelId,
                });

                // NOS AÑADIMOS AL PRESENCE
                await solicitudesChannel.presence.enter({
                    username: clientId,
                    timestamp: new Date().toISOString(),
                    channelId: storedChannelId,
                });

                setIsInPresence(true);
            }

            setChannelId(storedChannelId);
        };

        setupChannel();

        return () => {
            // No hace nada para evitar que se elimine en el lado del Expert.
        };
    }, [isInPresence]);

    // Iniciar el chat:
    useEffect(() => {
        if (!channelId) return;

        const channel = ablyClient.channels.get(`chat-ayuda-${channelId}`);

        // Mensaje de bienvenida automático:
        setMessages([
            {
                sender: "sistema",
                text: "Sabemos que estás pasando por un momento difícil, pero no estás sol@. Al llegar hasta aquí, has dado un paso valiente hacia tu bienestar.\n\nEstamos aquí para escucharte y ayudarte. No hay prisa, tómate el tiempo que necesites.\n\nSi te encuentras en una situación de emergencia, puedes utilizar directamente la línea telefónica de ayuda gratuita del Ministerio de Sanidad: 024.",
                clientId: clientId,
            }
        ]);

        // Agregar al usuario actual a la presencia cuando se inicia el chat
        channel.presence.enter({
            channelId,
            timestamp: new Date().toISOString(),
        });

        // Suscribimos a mensajes normales:
        channel.subscribe("message", (message) => {
            setMessages((prev) => [...prev, message.data]);
        });

        // Escuchamos si un Expert entra al canal
        channel.presence.subscribe("enter", (member) => {
            const data = member.data;
        });

        channel.presence.get((members) => {
            console.log("Members in presence:", members);
        });

        // Cleanup cuando el componente se desmonta
        return () => {
            channel.unsubscribe("message");
            channel.presence.unsubscribe("enter");
        };
    }, [channelId]);

    // Enviar un mensaje:
    const sendMessage = () => {
        if (!channelId) return;

        const channel = ablyClient.channels.get(`chat-ayuda-${channelId}`);

        if (!channel) console.log("no hay channel")

        if (input.trim() !== "") {
            const messageToSend: Message = {
                text: input.trim(),
                sender: "standard",
                clientId: clientId,
            };

            channel.publish("message", messageToSend);

            channel.presence.get((members) => {
                console.log("Members in presence:", members);
            });

            setInput("");
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-12 px-col1">

            <h2>Chat anónimo 24/7</h2>

            <div className="w-full flex flex-col items-center gap-8">

                <div className="relative w-full h-[50vh] flex flex-col overflow-y-auto overflow-x-hidden px-6">
                    <div className="flex flex-col justify-end gap-4 min-h-full">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === "standard" ? "justify-end" : "justify-start"}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`px-6 py-4 rounded-[1.6rem] max-w-[70%] whitespace-pre-wrap ${msg.sender === "standard" ? "rounded-br-none bg-[#cfc8c4] dark:bg-[var(--gris4)]" : "rounded-bl-none text-white fondo-degradado2"}`}
                                >
                                    {msg.text}
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Fading superior */}
                    <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[var(--background)] to-transparent z-10" />
                </div>

                <div className="w-full flex flex-row justify-between items-center gap-2 rounded-full p-2 bg-white dark:bg-[var(--gris4)] shadow-md">
                    <div className="pl-6 mobile:hidden tablet:block">
                        <Image
                            src="/iconos/iconos-otros/icono-editar.svg"
                            alt="icono escribir"
                            width={16}
                            height={16}
                            className="object-contain dark:invert"
                        />
                    </div>
                    <textarea
                        id="message"
                        placeholder="Empieza a escribir..."
                        className="flex-1 py-2 px-4 focus:outline-none placeholder-light dark:placeholder-dark dark:bg-[var(--gris4)] resize-none h-10"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Previene que haga saltos de línea (por si acaso)
                                sendMessage();
                            }
                        }}
                    />
                    <Boton
                        texto="Enviar"
                        tamano="grande"
                        jerarquia="primario"
                        onClick={sendMessage}
                    />
                </div>

            </div>

        </div>
    );
}