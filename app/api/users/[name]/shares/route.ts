import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS SHARES DE UN USUARIO (para el Perfil Público de un Usuario) */

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // 🔎 Filtro según Autor (Feed):
        const autorId = searchParams.get("autor");

        const shares = await prisma.share.findMany({
            where: {
                autor_id: autorId || undefined,
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
        console.error("Error obteniendo los shares.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}