import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* OBTENER UNA CATEGORÍA ESPECÍFICA */

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Falta el ID de la categoría." }, { status: 400 });
        }

        const categoria = await prisma.categoria.findUnique({
            where: { id: id }
        });

        if (!categoria) {
            return NextResponse.json({ error: "Categoria no encontrada." }, { status: 404 });
        }

        return NextResponse.json({ categoria }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo la categoría.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* MODIFICAR UNA CATEGORÍA ESPECÍFICA */

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.is_admin) {
        return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
    }

    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Falta el ID de la categoría." }, { status: 400 });
        }

        const categoria = await prisma.categoria.findUnique({
            where: { id: id }
        });

        if (!categoria) {
            return NextResponse.json({ error: "Categoria no encontrada." }, { status: 404 });
        }

        const { nombre } = await request.json();

        if (!nombre) {
            return NextResponse.json({ error: "Por favor, rellena los campos obligatorios." }, { status: 400 });
        }

        const updatedCategoria = await prisma.categoria.update({
            where: { id: id },
            data: {
                nombre: nombre || categoria.nombre,
            }
        });

        return NextResponse.json({ message: "Categoría actualizada correctamente.", categoria: updatedCategoria }, { status: 200 });
    } catch (error) {
        console.error("Error actualizando la categoría.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* ELIMINAR UNA CATEGORÍA ESPECÍFICA */

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.is_admin) {
        return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
    }

    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Falta el ID de la categoría." }, { status: 400 });
        }

        const categoria = await prisma.categoria.findUnique({
            where: { id: id }
        });

        if (!categoria) {
            return NextResponse.json({ error: "Categoria no encontrada." }, { status: 404 });
        }

        await prisma.categoria.delete({ where: { id: id } });

        return NextResponse.json({ message: "Categoria eliminada correctamente." }, { status: 200 });
    } catch (error) {
        console.error("Error eliminando la categoría.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}
