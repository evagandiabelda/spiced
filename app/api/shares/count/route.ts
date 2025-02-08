import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    try {
        const count = await prisma.share.count({
            where: { user: { name: session.user.name } },
        });

        return NextResponse.json({ count });
    } catch (error) {
        console.error("Error al obtener el conteo de shares:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
