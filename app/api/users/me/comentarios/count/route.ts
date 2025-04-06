import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* CONTAR EL TOTAL DE COMENTARIOS DEL USUARIO EN SESIÓN */
// No interesa listar los comentarios, solo el total.

export async function GET(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        const count = await prisma.comentario.count({
            where: {
                user_id: session.user.id,
            }
        });

        return NextResponse.json({ count }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo el total de comentarios.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}