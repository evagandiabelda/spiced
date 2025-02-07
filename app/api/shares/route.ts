import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS SHARES: */

export async function GET() {
  try {
    const shares = await prisma.share.findMany();
    return NextResponse.json({ message: "Shares recuperados correctamente", shares: shares }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error recuperando los shares" }, { status: 500 });
  }
}

/* CREAR UN SHARE */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titulo, texto, img_principal, img_secundaria } = body;

    const nuevoShare = await prisma.share.create({
      data: {
        titulo,
        texto,
        img_principal,
        img_secundaria,
        usuarioId: "64b28b9a-25f3-4a5b-b76e-0638a63f4581",
      },
    });

    return NextResponse.json({ message: "Shares publicado correctamente", share: nuevoShare }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error publicando el share" }, { status: 500 });
  }
}

/* MODIFICAR UN SHARE */

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, titulo, texto, img_principal, img_secundaria } = body;

    const shareActualizado = await prisma.share.update({
      where: { id },
      data: {
        titulo,
        texto,
        img_principal,
        img_secundaria,
      },
    });

    return NextResponse.json({ message: "Share actualizado correctamente", share: shareActualizado }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error actualizando el share" }, { status: 500 });
  }
}

/* ELIMINAR UN SHARE */

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const shareId = url.searchParams.get("id");

    if (!shareId) {
      return NextResponse.json({ error: "Missing 'shareId' parameter" }, { status: 400 });
    }

    await prisma.share.delete({
      where: { id: shareId },
    });

    return NextResponse.json({ message: "Share eliminado correctamente" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "No se ha podido eliminar el share" }, { status: 500 });
  }
}