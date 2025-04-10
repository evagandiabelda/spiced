import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* LISTAR LOS SHARES PUBLICADOS POR LOS USUARIOS A LOS QUE SIGUE EL USUARIO EN SESIÓN */

// El usuario en sesión sigue a otros usuarios. Estos ususarios publican Shares.
// Esta petición se usará como filtro en el Feed ("Usuarios que sigo").
// Se define por separado (y no en '/api/shares') porque ésta necesita autenticación.

export async function GET(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);

        // Obtener los usuarios seguidos por el usuario en sesión:
        const seguimientos = await prisma.seguimiento.findMany({
            where: {
                seguidor_id: session.user.id,
            },
            select: {
                seguido_id: true,
            }
        });

        // Extraer el ID de cada usuario seguido y crear un array:
        const idsSeguidos = seguimientos.map((s) => s.seguido_id)

        // 🔎 Filtro según parámetros de búsqueda (componente Search):
        const query = searchParams.get("query");

        // 🔎 Filtro según Categoría (Feed):
        const categoria = searchParams.get("categoria");

        // 🔎 Filtro según Spices (Feed):
        const spicesParam = searchParams.get("spices");
        const spices = spicesParam?.split(",") ?? [];

        // 🔎 Filtro según Verificados (Feed):
        const verificados = searchParams.get("verificados");


        // El filtro base filtra por los IDs de los usuarios seguidos:
        let filtros: any[] = [
            {
                autor_id: {
                    in: idsSeguidos,
                },
            }
        ];

        const shares = await prisma.share.findMany({
            where: query
                ? {
                    OR: [
                        { titulo: { contains: query, mode: "insensitive" } },
                        { texto: { contains: query, mode: "insensitive" } },
                    ],
                }
                : {
                    AND: {
                        autor_id: {
                            in: idsSeguidos,
                        },
                        share_verificado: verificados === 'verificados' ? true : undefined,
                        categorias: categoria
                            ? {
                                some: {
                                    categoria: { nombre: categoria },
                                },
                            }
                            : undefined,
                        spices:
                            spices.length > 0
                                ? {
                                    some: {
                                        spice: {
                                            nombre: { in: spices },
                                        },
                                    },
                                }
                                : undefined,
                    },
                },
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
                    },
                },
                categorias: {
                    include: {
                        categoria: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            }
        });

        return NextResponse.json({ shares }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo tus Shares.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* SEGUIR A UN USUARIO */

export async function POST(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "No autenticado." }, { status: 401 });
    }

    try {

        const { seguido_id } = await request.json();

        if (!seguido_id) {
            return NextResponse.json({ error: "Falta el ID del usuario a seguir." }, { status: 400 });
        }

        const nuevoSeguimiento = await prisma.seguimiento.create({
            data: {
                seguidor_id: session.user.id,
                seguido_id,
            },
        });

        return NextResponse.json(nuevoSeguimiento, { status: 201 });
    } catch (error) {
        console.error("Error al seguir usuario.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* DEJAR DE SEGUIR A UN USUARIO */

export async function DELETE(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "No autenticado." }, { status: 401 });
    }

    try {

        const { seguido_id } = await request.json();

        if (!seguido_id) {
            return NextResponse.json({ error: "Falta el ID del usuario a dejar de seguir." }, { status: 400 });
        }

        await prisma.seguimiento.delete({
            where: {
                seguidor_id_seguido_id: {
                    seguidor_id: session.user.id,
                    seguido_id,
                },
            },
        });

        return NextResponse.json({ message: "Has dejado de seguir a este usuario." }, { status: 200 });
    } catch (error) {
        console.error("Error al dejar de seguir usuario", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}