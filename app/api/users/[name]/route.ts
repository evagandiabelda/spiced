import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* OBTENER TODA LA INFO (pública) DE UN USUARIO ESPECÍFICO */
// Por ejemplo, para construir el perfil público de usuario.

export async function GET(req: Request, { params }: { params: Promise<{ name: string }> }) {
    try {
        // Obtener el nombre de usuario desde la URL
        const { name } = await params;

        if (!name) {
            return NextResponse.json({ error: "Falta el name del usuario." }, { status: 400 });
        }

        // Buscar el usuario en la base de datos
        const user = await prisma.user.findUnique({
            where: { name },
            select: {
                // Obtener solamente los datos públicos
                id: true,
                nombre_real: true,
                name: true,
                foto: true,
                descripcion_perfil: true,
                usuario_verificado: true,
                spices_seguidos: {
                    include: {
                        spice: true,
                    }
                },
                standard: {
                    select: {
                        insignia: true,
                    }
                },
                shares_publicados: {
                    include: {
                        autor: {
                            select: {
                                id: true,
                                name: true,
                                foto: true,
                                usuario_verificado: true,
                            }
                        },
                        comentarios: {
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
                        }
                    }
                },
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.error("Error obteniendo la información del usuario.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}


/* MODIFICAR UN USUARIO (Solo Admin) */

export async function PATCH(req: Request, { params }: { params: Promise<{ name: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session || session.user?.userType !== "admin") {
        return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
    }

    try {
        // Obtener el nombre de usuario desde la URL
        const { name } = await params;

        if (!name) {
            return NextResponse.json({ error: "Falta el name del usuario." }, { status: 400 });
        }

        // Obtener los datos a modificar de la request:
        const requestData = await req.json();

        // Filtrar solo los campos que tienen valores definidos y no son cadenas vacías
        const updateData: Record<string, any> = Object.fromEntries(
            Object.entries(requestData).filter(([_, value]) => value !== undefined && value !== "")
        );

        const updatedUser = await prisma.user.update({
            where: { name },
            data: updateData, // Solo se enviarán los campos que tengan un valor definido
        });

        return NextResponse.json({ message: "Usuario actualizado correctamente.", user: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Error actualizando usuario.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* ELIMINAR UN USUARIO (Solo Admin) */

export async function DELETE(request: Request, { params }: { params: Promise<{ name: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session || session.user?.userType !== "admin") {
        return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
    }

    try {
        // Obtener el nombre de usuario desde la URL
        const { name } = await params;

        if (!name) {
            return NextResponse.json({ error: "Falta el name del usuario." }, { status: 400 });
        }

        await prisma.user.delete({
            where: { name },
        });

        return NextResponse.json({ message: "Usuario eliminado correctamente." }, { status: 200 });
    } catch (error) {
        console.error("Error eliminando usuario.", error);
        return NextResponse.json({ message: "Error interno del servidor.", error: error }, { status: 500 });
    }
}