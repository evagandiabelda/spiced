import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { comprobarInsignia } from "@/lib/insignias";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS COMENTARIOS DE UN SHARE (en base a su slug) */

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json({ error: "Falta el slug del Share." }, { status: 400 });
        }

        // Buscar el Share por su slug
        const share = await prisma.share.findUnique({
            where: { slug },
            select: { id: true } // Solo necesitamos el ID
        });

        if (!share) {
            return NextResponse.json({ error: "Share no encontrado." }, { status: 404 });
        }

        // Obtener todos los comentarios asociados a este Share
        const comentarios = await prisma.comentario.findMany({
            where: { id: share.id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        foto: true,
                        usuario_verificado: true
                    }
                }
            },
            orderBy: { created_at: "desc" }
        });

        return NextResponse.json({ comentarios }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo los comentarios.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* CREAR UN COMENTARIO */
export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json({ error: "Falta el slug del Share." }, { status: 400 });
        }

        // Buscar el Share por su slug
        const share = await prisma.share.findUnique({
            where: { slug },
            select: {
                id: true,
                autor: {
                    select: {
                        id: true,
                    }
                }
            }
        });

        if (!share) {
            return NextResponse.json({ error: "Share no encontrado." }, { status: 404 });
        }

        // Extraer datos del comentario desde el body
        const { texto } = await request.json();

        if (!texto || texto.trim() === "") {
            return NextResponse.json({ error: "El comentario no puede estar vacío." }, { status: 400 });
        }

        // Insertar el nuevo Comentario en la base de datos
        const nuevoComentario = await prisma.comentario.create({
            data: {
                texto,
                user_id: session.user.id,
                share_id: share.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        foto: true,
                        usuario_verificado: true,
                    }
                }
            }
        });

        await comprobarInsignia(share.autor.id);

        return NextResponse.json({ message: "Comentario publicado correctamente.", comentario: nuevoComentario }, { status: 201 });
    } catch (error) {
        console.error("Error al publicar el comentario.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

