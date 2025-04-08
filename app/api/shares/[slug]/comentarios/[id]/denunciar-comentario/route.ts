import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* 🚨 REGISTRAR UNA DENUNCIA A UN COMENTARIO */

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string, id: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        // Extraer slug y id del comentario
        const { slug, id } = await params;
        if (!slug || !id) {
            return NextResponse.json({ error: "Faltan parámetros en la URL" }, { status: 400 });
        }

        // Buscar el comentario en la BD
        const comentario = await prisma.comentario.findUnique({
            where: { id: id },
            include: {
                share: {
                    select: {
                        id: true,
                    }
                },
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

        if (!comentario) {
            return NextResponse.json({ error: "Comentario no encontrado." }, { status: 404 });
        }

        // Extraer del body el motivo de la denuncia
        const { motivo } = await request.json();

        if (!motivo || motivo.trim() === "") {
            return NextResponse.json({ error: "Debes proporcionar un motivo de denuncia." }, { status: 400 });
        }

        // Registrar la denuncia en la BD
        const denuncia = await prisma.denunciaComentario.create({
            data: {
                motivo,
                comentario_id: id,
                user_id: session.user.id
            }
        });

        return NextResponse.json({ message: "Denuncia registrada correctamente.", denuncia }, { status: 200 });
    } catch (error) {
        console.error("Error registrando la denuncia.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}