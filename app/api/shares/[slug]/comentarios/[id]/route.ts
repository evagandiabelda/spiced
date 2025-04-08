import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* OBTENER UN COMENTARIO ESPECÍFICO */

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string, id: string }> }) {
    try {

        // Extraer slug y id del comentario
        const { slug, id } = await params;
        if (!slug || !id) {
            return NextResponse.json({ error: "Faltan parámetros en la URL" }, { status: 400 });
        }

        // Buscar el comentario en la BD
        const comentario = await prisma.comentario.findUnique({
            where: { id: id },
            include: {
                share: {
                    select: {
                        id: true,
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        foto: true,
                        usuario_verificado: true,
                    }
                },
                denuncias: true, // Esto se usará para consultarlas desde el panel de Admin.
            }
        });

        if (!comentario) {
            return NextResponse.json({ error: "Comentario no encontrado en este Share." }, { status: 404 });
        }

        return NextResponse.json({ comentario }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo el comentario.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* MODIFICAR UN COMENTARIO ESPECÍFICO */
// No interesa que el autor del comentario pueda editarlo.


/* ELIMINAR UN COMENTARIO ESPECÍFICO */

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Falta el ID del comentario." }, { status: 400 });
        }

        const comentario = await prisma.comentario.findUnique({
            where: { id: id }
        });

        if (!comentario) {
            return NextResponse.json({ error: "Comentario no encontrado." }, { status: 404 });
        }

        // Comprobar si el usuario es Admin o es el autor del comentario
        if (!session.user.is_admin && session.user.id !== comentario.user_id) {
            return NextResponse.json({ error: "No tienes permiso para eliminar este comentario." }, { status: 403 });
        }

        await prisma.comentario.delete({ where: { id: id } });

        return NextResponse.json({ message: "Comentario eliminado correctamente." }, { status: 200 });
    } catch (error) {
        console.error("Error eliminando el comentario.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}
