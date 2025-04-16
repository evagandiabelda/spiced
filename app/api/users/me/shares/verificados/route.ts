import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS SHARES VERIFICADOS */
// Todos los Shares de terceros (standard) que el usuario en sesión (expert) ha verificado.

export async function GET(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name || !session?.user.usuario_verificado) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        const user = await prisma.expert.findUnique({
            where: {
                id: session.user.id,
            },
            include: {
                shares_verificados: true,
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        return NextResponse.json(user.shares_verificados, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo tus Shares.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* VERIFICAR UN SHARE */

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.user.usuario_verificado) {
        return NextResponse.json({ error: "No tienes permisos para realizar esta acción." }, { status: 403 });
    }

    const { shareId } = await req.json();

    if (!shareId) {
        return NextResponse.json({ error: "Falta el ID del Share." }, { status: 400 });
    }

    try {
        // Buscar el Share con su autor y su tipo de usuario
        const share = await prisma.share.findUnique({
            where: { id: shareId },
            include: {
                autor: {
                    include: { standard: true, expert: true }
                }
            }
        });

        if (!share) {
            return NextResponse.json({ error: "Share no encontrado." }, { status: 404 });
        }

        // 1. Verificar que el autor sea un usuario Standard
        if (!share.autor.standard) {
            return NextResponse.json({ error: "Solo se pueden verificar Shares de usuarios Standard." }, { status: 400 });
        }

        // 2. Evitar que el verificador sea el propio autor
        if (share.autor_id === session.user.id) {
            return NextResponse.json({ error: "No puedes verificar tus propios Shares." }, { status: 403 });
        }

        // 3. Verificar el Share y asignarlo al usuario Expert
        const shareActualizado = await prisma.share.update({
            where: { id: shareId },
            data: {
                share_verificado: true,
                Expert: {
                    connect: { id: session.user.id }
                }
            }
        });

        return NextResponse.json({ success: true, share: shareActualizado }, { status: 200 });

    } catch (error) {
        console.error("Error verificando el Share.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}