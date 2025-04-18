import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS COMENTARIOS (DE TODOS LOS SHARES) */
// Usado para el Panel de Admin.

export async function GET() {
    try {

        const comentarios = await prisma.comentario.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        foto: true,
                        usuario_verificado: true,
                    }
                },
                share: {
                    select: {
                        id: true,
                        titulo: true,
                        share_verificado: true,
                        slug: true,
                    }
                },
                denuncias: true,
            },
            orderBy: {
                created_at: "desc",
            }
        });

        return NextResponse.json({ comentarios }, { status: 200 });

    } catch (error) {
        console.error("Error obteniendo los comentarios.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}