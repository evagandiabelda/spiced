import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

/* --------- RUTA PARA OBTENER EL TIPO DE USUARIO (Standard o Expert) --------- */

// Se utiliza tras el Login para redirigir a un panel u otro, dependiendo del tipo de usuario.

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                expert: true,
                standard: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        if (user.expert) {
            return NextResponse.json({ tipo: "expert" });
        } else if (user.standard) {
            return NextResponse.json({ tipo: "standard" });
        } else {
            return NextResponse.json({ tipo: "desconocido" });
        }
    } catch (error) {
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
