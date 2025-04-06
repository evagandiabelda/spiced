import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS SHARES GUARDADOS */
// (Todos los Shares de terceros que el usuario en sesión ha guardado).

export async function GET(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                shares_guardados: {
                    include: {
                        share: true,
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        return NextResponse.json(user.shares_guardados, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo tus Shares.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}