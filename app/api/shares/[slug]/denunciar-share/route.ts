import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* 🚨 REGISTRAR UNA DENUNCIA A UN SHARE */

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        // Extraer el slug
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json({ error: "Faltan el slug del Share." }, { status: 400 });
        }

        // Buscar el Share por su slug
        const share = await prisma.share.findUnique({
            where: { slug: slug },
            include: {
                autor: true,
                denuncias: true,
            }
        });

        if (!share) {
            return NextResponse.json({ error: "Share no encontrado." }, { status: 404 });
        }

        // Extraer del body el motivo de la denuncia
        const { motivo } = await request.json();

        if (!motivo || motivo.trim() === "") {
            return NextResponse.json({ error: "Debes proporcionar un motivo de denuncia." }, { status: 400 });
        }

        // Registrar la denuncia en la BD
        const denuncia = await prisma.denunciaShare.create({
            data: {
                motivo,
                share_id: share.id,
                user_id: session.user.id
            }
        });

        return NextResponse.json({ message: "Denuncia registrada correctamente.", denuncia }, { status: 200 });
    } catch (error) {
        console.error("Error registrando la denuncia.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}