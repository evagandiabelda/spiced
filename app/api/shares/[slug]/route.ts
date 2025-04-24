import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* OBTENER UN SHARE ESPECÍFICO */

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {

    try {

        // Obtener los datos del usuario en sesión:
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        // Obtener el Slug desde la URL
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json({ error: "Falta el slug del share." }, { status: 400 });
        }

        const share = await prisma.share.findUnique({
            where: { slug },
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
            return NextResponse.json({ error: "Share no encontrado." }, { status: 404 });
        }

        // Comprobar si el usuario autenticado sigue al autor
        const siguiendo = userId
            ? !!(await prisma.seguimiento.findFirst({
                where: {
                    seguidor_id: userId,
                    seguido_id: share.autor.id,
                },
            }))
            : false;

        // Comprobar si el usuario ha guardado el share
        const guardado = userId
            ? !!(await prisma.shareGuardado.findFirst({
                where: {
                    share_id: share.id,
                    user_id: userId,
                },
            }))
            : false;

        return NextResponse.json({ share, siguiendo, guardado }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo el share.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* MODIFICAR UN SHARE ESPECÍFICO */

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        // Obtener el Slug desde la URL
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json({ error: "Falta el slug del share." }, { status: 400 });
        }

        // Obtener el Share en base al ID
        const share = await prisma.share.findUnique({
            where: { slug },
            select: { autor_id: true }, // Solo seleccionamos el autor_id para la verificación
        });

        if (!share) {
            return NextResponse.json({ error: "Share no encontrado." }, { status: 404 });
        }

        // Verificar que el share pertenece al usuario autenticado
        if (share.autor_id !== session.user.id) {
            return NextResponse.json({ error: "No tienes permisos para modificar este share." }, { status: 403 });
        }

        // Recoger los datos de la query
        const body = await request.json();
        const { titulo, texto, img_principal, img_secundaria, spices, categorias } = body;

        // Actualizar el Share
        const updatedShare = await prisma.share.update({
            where: { slug },
            data: { titulo, texto, img_principal, img_secundaria, spices, categorias }, // 🔴 No tengo claro si el array de 'spices' y 'categorías' llegará aquí con el formato adecuado.
        });

        return NextResponse.json({ message: "Share actualizado correctamente.", share: updatedShare }, { status: 200 });
    } catch (error) {
        console.error("Error actualizando el share.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* ELIMINAR UN SHARE ESPECÍFICO */
export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        // Obtener el Slug desde la URL
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json({ error: "Falta el slug del share." }, { status: 400 });
        }

        // Obtener el Share en base al ID
        const share = await prisma.share.findUnique({
            where: { slug },
            select: { autor_id: true }, // Solo seleccionamos el autor_id para la verificación
        });

        if (!share) {
            return NextResponse.json({ error: "Share no encontrado." }, { status: 404 });
        }

        // Si el usuario no es Admin o no es el Autor del Share:
        if (session?.user.userType !== "admin" && session?.user.id !== share.autor_id) {
            return NextResponse.json({ error: "No tienes permisos para eliminar este share." }, { status: 403 });
        }

        await prisma.share.delete({ where: { slug } });

        return NextResponse.json({ message: "Share eliminado correctamente." }, { status: 200 });
    } catch (error) {
        console.error("Error eliminando el share.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}
