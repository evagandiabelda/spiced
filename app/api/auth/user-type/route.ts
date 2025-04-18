import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

/* --------- RUTA PARA OBTENER EL TIPO DE USUARIO (Standard o Expert) --------- */

// Se utiliza tras el Login para redirigir a un panel u otro, dependiendo del tipo de usuario.

export async function POST(req: Request) {
    const { email, id } = await req.json();

    if (!email && !id) {
        return NextResponse.json({ error: "Se requiere 'email' o 'id'" }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: email ? { email } : { id },
            include: {
                expert: true,
                standard: true,
                admin: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        if (user.standard) {
            return NextResponse.json({ tipo: "standard" });
        } else if (user.expert) {
            return NextResponse.json({ tipo: "expert" });
        } else if (user.admin) {
            return NextResponse.json({ tipo: "admin" });
        } else {
            return NextResponse.json({ tipo: "desconocido" });
        }
    } catch (error) {
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
