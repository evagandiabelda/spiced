import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS SHARES */
export async function GET() {
  try {
    const shares = await prisma.share.findMany();
    return NextResponse.json({ message: "Shares recuperados correctamente", shares }, { status: 200 });
  } catch (error) {
    console.error("Error recuperando los shares:", error);
    return NextResponse.json({ error: "Error recuperando los shares" }, { status: 500 });
  }
}

/* CREAR UN SHARE */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titulo, texto, img_principal, img_secundaria, userId } = body;

    if (!titulo || !texto || !userId) {
      return NextResponse.json({ error: "Título, texto y userId son obligatorios" }, { status: 400 });
    }

    const newShare = await prisma.share.create({
      data: {
        titulo,
        texto,
        img_principal,
        img_secundaria,
        userId,
      },
    });

    return NextResponse.json({ message: "Share publicado correctamente", share: newShare }, { status: 201 });
  } catch (error) {
    console.error("Error publicando el share:", error);
    return NextResponse.json({ error: "Error publicando el share" }, { status: 500 });
  }
}

/* MODIFICAR UN SHARE */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, titulo, texto, img_principal, img_secundaria } = body;

    if (!id) {
      return NextResponse.json({ error: "ID del share es obligatorio" }, { status: 400 });
    }

    const updatedShare = await prisma.share.update({
      where: { id },
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
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const shareId = url.searchParams.get("id");

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
