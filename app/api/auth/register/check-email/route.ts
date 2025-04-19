import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

/* --------- RUTA PARA VALIDAR QUE EL EMAIL NO ESTÉ YA EN LA BD --------- */

// Se utiliza durante el registro, tanto de usuarios Expert como Standard.
// Se utiliza POST (y no GET) para asegurar la privacidad del email durante la petición.

export async function POST(req: Request) {
    const { email } = await req.json();

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    return NextResponse.json({ exists: !!existingUser });
}
