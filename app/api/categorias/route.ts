import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* LISTAR TODAS LAS CATEGORÍAS */

export async function GET() {
    try {
        const categorias = await prisma.categoria.findMany({
            include: {
                shares_asociados: {
                    include: {
                        share: {
                            include: {
                                autor: {
                                    select: {
                                        id: true,
                                        name: true,
                                        foto: true,
                                        usuario_verificado: true
                                    },
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
                        }
                    }
                }
            }
        });

        return NextResponse.json(categorias, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo las categorías.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* CREAR UNA CATEGORÍA (solo desde el panel de Admin) */

export async function POST(req: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.is_admin) {
        return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
    }

    try {
        // Obtener los datos enviados en la petición
        const body = await req.json();
        const { nombre } = body;

        // Validar que no falten datos
        if (!nombre) {
            return NextResponse.json({ error: "Por favor, rellena los campos obligatorios." }, { status: 400 });
        }

        // Insertar la nueva Categoría en la base de datos
        const nuevaCategoria = await prisma.categoria.create({
            data: {
                nombre: nombre,
            }
        });

        return NextResponse.json({ message: "Categoría registrada correctamente.", user: nuevaCategoria }, { status: 201 });
    } catch (error) {
        console.error("Error al añadir la categoría.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }

}