import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* VERIFICAR UN USUARIO (Solo Admin) */

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session || session.user?.userType !== "admin") {
        return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
    }

    try {
        // Obtener el nombre de usuario desde la URL
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Falta el ID del usuario." }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                usuario_verificado: true,
            },
        });

        return NextResponse.json({ message: "Usuario verificado correctamente.", user: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Error actualizando usuario.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}