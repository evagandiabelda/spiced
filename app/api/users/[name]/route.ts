import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* OBTENER TODA LA INFO (pública) DE UN USUARIO ESPECÍFICO */
// Por ejemplo, para construir el perfil público de usuario.

export async function GET(req: Request, { params }: { params: { name: string } }) {
    try {
        // Obtener el nombre de usuario desde la URL
        const { name } = params;

        // Buscar el usuario en la base de datos
        const user = await prisma.user.findUnique({
            where: { name },
            select: {
                // Obtener solamente los datos públicos
                id: true,
                nombre_completo: true,
                name: true,
                foto: true,
                descripcion_perfil: true,
                usuario_verificado: true,
                spices_seguidos: true,
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
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.error("Error en la API:", error);
        return NextResponse.json({ error: "Error obteniendo la información del usuario" }, { status: 500 });
    }
}

