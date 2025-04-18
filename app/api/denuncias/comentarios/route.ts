import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* OBTENER TODAS LAS DENUNCIAS DE TODOS LOS COMENTARIOS (solo Admin) */

export async function GET(request: NextRequest) {

    const session = await getServerSession(authOptions);

    if (session?.user?.userType !== "admin") {
        return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
    }

    try {

        const denuncias = await prisma.denunciaComentario.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        foto: true,
                        usuario_verificado: true,
                    }
                },
                comentario: {
                    include: {
                        share: {
                            select: {
                                id: true,
                                titulo: true,
                                img_principal: true,
                                share_verificado: true,
                                created_at: true,
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json({ denuncias }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo las denuncias.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }

}