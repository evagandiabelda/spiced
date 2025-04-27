
import { NextResponse } from "next/server";
import Ably from "ably/promises";

export async function GET() {
    try {
        // Crear una instancia del cliente de Ably usando la API KEY secreta
        const client = new Ably.Rest(process.env.ABLY_API_KEY!); // Guardada también en Vercel.
        if (!client) throw new Error("No hay client.");

        // Canal de solicitudes de ayuda
        const channel = client.channels.get("solicitudes-ayuda");
        if (!channel) throw new Error("No hay channel.");

        // Obtenemos los miembros presentes
        const presencePage = await channel.presence.get();
        if (!presencePage) throw new Error("No hay presencePage.");

        // Opcional: podrías mapear los datos para enviar solo lo que necesites
        const members = presencePage.items.map((member) => ({
            clientId: member.clientId,
            data: member.data,
        }));

        console.log("Members:", members);

        return NextResponse.json(members);
    } catch (error) {
        console.error("[API/ABLY/GET_SOLICITUDES]", error);
        return new NextResponse("Error al obtener solicitudes activas", { status: 500 });
    }
}
