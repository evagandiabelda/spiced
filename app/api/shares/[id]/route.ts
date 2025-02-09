import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* OBTENER UN SHARE */
export async function GET(request: Request) {
    try {
        // Extraer el ID desde la URL
        const url = new URL(request.url);
        const segments = url.pathname.split("/");
        const shareId = segments[segments.length - 1];

        if (!shareId) {
            return NextResponse.json({ error: "Falta el ID del share" }, { status: 400 });
        }

        const share = await prisma.share.findUnique({
            where: { id: shareId },
        });

        if (!share) {
            return NextResponse.json({ error: "Share no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ share }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo el share:", error);
        return NextResponse.json({ error: "Error obteniendo el share" }, { status: 500 });
    }
}

/* MODIFICAR UN SHARE */
export async function PUT(request: Request) {
    try {
        // Extraer el ID desde la URL
        const url = new URL(request.url);
        const segments = url.pathname.split("/"); // Extraer los segmentos de la ruta
        const shareId = segments[segments.length - 1]; // Último segmento es el ID

        if (!shareId) {
            return NextResponse.json({ error: "ID del share es obligatorio" }, { status: 400 });
        }

        const body = await request.json();
        const { titulo, texto, img_principal, img_secundaria } = body;

        if (!titulo || !texto) {
            return NextResponse.json({ error: "Título y texto son obligatorios" }, { status: 400 });
        }

        const updatedShare = await prisma.share.update({
            where: { id: shareId },
            data: { titulo, texto, img_principal, img_secundaria },
        });

        return NextResponse.json({ message: "Share actualizado correctamente", share: updatedShare }, { status: 200 });
    } catch (error) {
        console.error("Error actualizando el share:", error);
        return NextResponse.json({ error: "Error actualizando el share" }, { status: 500 });
    }
}

/* ELIMINAR UN SHARE */
export async function DELETE(request: Request) {
    try {
        // Extraer el ID desde la URL
        const url = new URL(request.url);
        const segments = url.pathname.split("/");
        const shareId = segments[segments.length - 1];

        if (!shareId) {
            return NextResponse.json({ error: "Falta el parámetro 'id'" }, { status: 400 });
        }

        await prisma.share.delete({ where: { id: shareId } });

        return NextResponse.json({ message: "Share eliminado correctamente" }, { status: 200 });
    } catch (error) {
        console.error("Error eliminando el share:", error);
        return NextResponse.json({ error: "No se ha podido eliminar el share" }, { status: 500 });
    }
}
