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

/* GUARDAR UN SHARE */

export async function POST(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        const { share_id } = await request.json();

        if (!share_id) {
            return NextResponse.json({ error: "Falta el ID del Share." }, { status: 400 });
        }

        // Comprobar si ya está guardado para evitar duplicados
        const yaGuardado = await prisma.shareGuardado.findUnique({
            where: {
                user_id_share_id: {
                    user_id: session.user.id,
                    share_id,
                },
            },
        });

        if (yaGuardado) {
            return NextResponse.json({ message: "Este Share ya está guardado." }, { status: 200 });
        }

        // Guardar el Share
        const nuevoGuardado = await prisma.shareGuardado.create({
            data: {
                user_id: session.user.id,
                share_id,
            },
        });

        return NextResponse.json(nuevoGuardado, { status: 201 });
    } catch (error) {
        console.error("Error al guardar el Share.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* ELIMINAR UN SHARE DE LA LISTA DE GUARDADOS */

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        const { share_id } = await request.json();

        if (!share_id) {
            return NextResponse.json({ error: "Falta el ID del Share." }, { status: 400 });
        }

        // Eliminar el Share guardado (si existe)
        await prisma.shareGuardado.delete({
            where: {
                user_id_share_id: {
                    user_id: session.user.id,
                    share_id,
                },
            },
        });

        return NextResponse.json({ message: "Share eliminado de guardados." }, { status: 200 });

    } catch (error) {
        console.error("Error al quitar el Share guardado.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}
