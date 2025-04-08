import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* OBTENER UN SPICE ESPECÍFICO */

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Falta el ID del spice." }, { status: 400 });
        }

        const spice = await prisma.spice.findUnique({
            where: { id: id }
        });

        if (!spice) {
            return NextResponse.json({ error: "Spice no encontrado." }, { status: 404 });
        }

        return NextResponse.json({ spice }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo el spice.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* MODIFICAR UN SPICE ESPECÍFICO */

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.is_admin) {
        return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
    }

    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Falta el ID del Spice." }, { status: 400 });
        }

        const spice = await prisma.spice.findUnique({
            where: { id: id }
        });

        if (!spice) {
            return NextResponse.json({ error: "Spice no encontrado." }, { status: 404 });
        }

        const { nombre } = await request.json();

        if (!nombre) {
            return NextResponse.json({ error: "Por favor, rellena los campos obligatorios." }, { status: 400 });
        }

        const updatedSpice = await prisma.spice.update({
            where: { id: id },
            data: {
                nombre: nombre || spice.nombre,
            }
        });

        return NextResponse.json({ message: "Spice actualizado correctamente.", spice: updatedSpice }, { status: 200 });
    } catch (error) {
        console.error("Error actualizando el spice.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* ELIMINAR UN SPICE ESPECÍFICO */

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.is_admin) {
        return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
    }

    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Falta el ID del Spice." }, { status: 400 });
        }

        const spice = await prisma.spice.findUnique({
            where: { id: id }
        });

        if (!spice) {
            return NextResponse.json({ error: "Spice no encontrado." }, { status: 404 });
        }

        await prisma.spice.delete({ where: { id: id } });

        return NextResponse.json({ message: "Spice eliminado correctamente." }, { status: 200 });
    } catch (error) {
        console.error("Error eliminando el spice.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}
