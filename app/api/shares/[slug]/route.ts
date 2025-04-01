import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* OBTENER UN SHARE ESPECÍFICO */

export async function GET(request: Request) {
    try {
        // Extraer el ID desde la URL
        const url = new URL(request.url);
        const segments = url.pathname.split("/");
        const shareId = segments[segments.length - 1];

        if (!shareId) {
            return NextResponse.json({ error: "Falta el ID del share" }, { status: 400 });
        }

        const share = await prisma.share.findUnique({
            where: { id: shareId },
            include: {
                autor: {
                    select: {
                        id: true,
                        name: true,
                        foto: true,
                        usuario_verificado: true,
                    }
                },
                spices: {
                    include: {
                        spice: true,
                    }
                },
                categorias: {
                    include: {
                        categoria: true,
                    }
                },
                comentarios: {
                    select: {
                        id: true,
                        texto: true,
                        created_at: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                foto: true,
                                usuario_verificado: true,
                            }
                        }
                    }
                }
            }
        });

        if (!share) {
            return NextResponse.json({ error: "Share no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ share }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo el share:", error);
        return NextResponse.json({ error: "Error obteniendo el share" }, { status: 500 });
    }
}

/* MODIFICAR UN SHARE ESPECÍFICO */

export async function PUT(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    try {
        // Extraer el ID desde la URL
        const url = new URL(request.url);
        const segments = url.pathname.split("/"); // Extraer los segmentos de la ruta
        const shareId = segments[segments.length - 1]; // Último segmento es el ID

        if (!shareId) {
            return NextResponse.json({ error: "ID del share es obligatorio" }, { status: 400 });
        }

        // Obtener el Share en base al ID
        const share = await prisma.share.findUnique({
            where: { id: shareId },
            select: { autor_id: true }, // Solo seleccionamos el autor_id para la verificación
        });

        if (!share) {
            return NextResponse.json({ error: "Share no encontrado" }, { status: 404 });
        }

        // Verificar que el share pertenece al usuario autenticado
        if (share.autor_id !== session.user.id) {
            return NextResponse.json({ error: "No tienes permisos para modificar este share" }, { status: 403 });
        }

        // Recoger los datos de la query
        const body = await request.json();
        const { titulo, texto, img_principal, img_secundaria, spices, categorias } = body;

        // Actualizar el Share
        const updatedShare = await prisma.share.update({
            where: { id: shareId },
            data: { titulo, texto, img_principal, img_secundaria, spices, categorias }, // 🔴 No tengo claro si el array de 'spices' y 'categorías' llegará aquí con el formato adecuado.
        });

        return NextResponse.json({ message: "Share actualizado correctamente", share: updatedShare }, { status: 200 });
    } catch (error) {
        console.error("Error actualizando el share:", error);
        return NextResponse.json({ error: "Error actualizando el share" }, { status: 500 });
    }
}

/* ELIMINAR UN SHARE ESPECÍFICO */
export async function DELETE(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    try {
        // Extraer el ID desde la URL
        const url = new URL(request.url);
        const segments = url.pathname.split("/");
        const shareId = segments[segments.length - 1];

        if (!shareId) {
            return NextResponse.json({ error: "Falta el parámetro 'id'" }, { status: 400 });
        }

        // Obtener el Share en base al ID
        const share = await prisma.share.findUnique({
            where: { id: shareId },
            select: { autor_id: true }, // Solo seleccionamos el autor_id para la verificación
        });

        if (!share) {
            return NextResponse.json({ error: "Share no encontrado" }, { status: 404 });
        }

        // Verificar que el share pertenece al usuario autenticado
        if (share.autor_id !== session.user.id) {
            return NextResponse.json({ error: "No tienes permisos para eliminar este share" }, { status: 403 });
        }

        await prisma.share.delete({ where: { id: shareId } });

        return NextResponse.json({ message: "Share eliminado correctamente" }, { status: 200 });
    } catch (error) {
        console.error("Error eliminando el share:", error);
        return NextResponse.json({ error: "No se ha podido eliminar el share" }, { status: 500 });
    }
}
