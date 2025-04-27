"use client";

import { useState, useEffect } from "react";
import ablyClient from "@/lib/ably";
import { motion } from "framer-motion";
import Image from "next/image";
import Boton from "@/components/buttons/Boton";

interface Message {
    text: string;
    sender: "standard" | "expert" | "sistema";
    clientId: string;
}

interface SapsExpertFormProps {
    channelId: string; // Recibimos el channelId como prop
}

export default function SapsExpertForm({ channelId }: SapsExpertFormProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (!channelId) return;

        const channel = ablyClient.channels.get(`chat-ayuda-${channelId}`);

        const fetchHistory = () => {

            channel.history({ limit: 50 }, (err, resultPage) => {
                if (err) {
                    console.error("Error al recuperar historial:", err);
                    return;
                }
                if (!resultPage) return;

                const oldMessages = resultPage.items
                    .map((msg) => msg.data as Message)
                    .reverse();

                setMessages(oldMessages);
                console.log("Old messages: ", oldMessages)

                // Subscribirse a nuevos mensajes
                channel.subscribe("message", (message) => {
                    setMessages((prev) => [...prev, message.data]);
                });

                // Entrar en presencia
                channel.presence.enter({
                    expertJoinedAt: new Date().toISOString(),
                });
            });

        };

        fetchHistory();
    }, [channelId]);

    const sendMessage = () => {
        if (!channelId || input.trim() === "") return;

        const channel = ablyClient.channels.get(`chat-ayuda-${channelId}`);

        const messageToSend: Message = {
            text: input.trim(),
            sender: "expert", // El Expert sería "yo" para sí mismo
            clientId: "expert", // Podrías usar algo más dinámico si quieres
        };

        channel.publish("message", messageToSend);

        setInput("");
    };

    return (
        <div className="w-full flex flex-col items-center gap-12 px-col1">
            <h2>Chat de Ayuda - Expert</h2>

            <div className="w-full flex flex-col items-center gap-8">
                <div className="relative w-full h-[50vh] flex flex-col overflow-y-auto overflow-x-hidden px-6">
                    <div className="flex flex-col justify-end gap-4 min-h-full">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === "expert" ? "justify-end" : "justify-start"}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`px-6 py-4 rounded-[1.6rem] max-w-[70%] whitespace-pre-wrap ${msg.sender === "expert" ? "rounded-br-none bg-[#cfc8c4] dark:bg-[var(--gris4)]" : "rounded-bl-none text-white fondo-degradado1"}`}
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
                    <div className="pl-6">
                        <Image
                            src="/iconos/iconos-otros/icono-editar.svg"
                            alt="icono escribir"
                            width={16}
                            height={16}
                            className="object-contain"
                        />
                    </div>
                    <input
                        type="text"
                        id="message"
                        placeholder="Escribe tu respuesta..."
                        className="flex-1 py-2 px-4 focus:outline-none placeholder-light dark:placeholder-dark"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
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
