import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // Ajusta la ruta si es necesario

const prisma = new PrismaClient();

/* LISTAR TODOS LOS SHARES DEL USUARIO */
export async function GET() {
    try {
        // Obtener la sesión del usuario autenticado
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.name) {
            return NextResponse.json({ error: "No autenticado" }, { status: 401 });
        }

        // Usar el nombre del usuario en sesión en lugar de los params
        const name = session.user.name;

        // Buscar el usuario en la base de datos
        const user = await prisma.user.findUnique({
            where: { name },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        // Buscar los shares del usuario
        const shares = await prisma.share.findMany({
            where: { userId: user.id },
            include: {
                user: { select: { id: true, name: true } },
            },
            orderBy: { created_at: "desc" },
        });

        return NextResponse.json(shares, { status: 200 });

    } catch (error) {
        console.error("Error en la API:", error);
        return NextResponse.json({ error: "Error obteniendo los shares" }, { status: 500 });
    }
}
