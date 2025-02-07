import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, context: { params: { nombre_usuario: string } }) {
    try {
        // Extraer params de forma correcta (SIN await)
        const { nombre_usuario } = context.params;

        // Buscamos el usuario por su nombre de usuario
        const user = await prisma.usuario.findUnique({
            where: { nombre_usuario },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        // Buscamos los shares del usuario
        const shares = await prisma.share.findMany({
            where: { usuarioId: user.id },
            include: {
                usuario: {
                    select: { id: true, nombre_usuario: true },
                },
            },
            orderBy: { created_at: "desc" },
        });

        return NextResponse.json(shares, { status: 200 });

    } catch (error) {
        console.error("Error en la ruta API:", error);
        return NextResponse.json({ error: "Error obteniendo los shares del usuario" }, { status: 500 });
    }
}
