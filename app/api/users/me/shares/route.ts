import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS SHARES DEL USUARIO EN SESIÓN */

export async function GET(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        const shares = await prisma.share.findMany({
            where: {
                autor_id: session.user.id,
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