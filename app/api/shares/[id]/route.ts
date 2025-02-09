import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* MODIFICAR UN SHARE */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const shareId = params.id; // Extraemos el ID desde la URL dinámica

        if (!shareId) {
            return NextResponse.json({ error: "ID del share es obligatorio" }, { status: 400 });
        }

        const body = await request.json(); // Extraemos los datos del body
        const { titulo, texto, img_principal, img_secundaria } = body;

        if (!titulo || !texto) {
            return NextResponse.json({ error: "Título y texto son obligatorios" }, { status: 400 });
        }

        const updatedShare = await prisma.share.update({
            where: { id: shareId },
            data: {
                titulo,
                texto,
                img_principal,
                img_secundaria,
            },
        });

        return NextResponse.json({ message: "Share actualizado correctamente", share: updatedShare }, { status: 200 });
    } catch (error) {
        console.error("Error actualizando el share:", error);
        return NextResponse.json({ error: "Error actualizando el share" }, { status: 500 });
    }
}

/* ELIMINAR UN SHARE */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const shareId = params.id; // Extraemos el ID desde la URL dinámica

        if (!shareId) {
            return NextResponse.json({ error: "Falta el parámetro 'id'" }, { status: 400 });
        }

        await prisma.share.delete({
            where: { id: shareId },
        });

        return NextResponse.json({ message: "Share eliminado correctamente" }, { status: 200 });
    } catch (error) {
        console.error("Error eliminando el share:", error);
        return NextResponse.json({ error: "No se ha podido eliminar el share" }, { status: 500 });
    }
}
