import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS SHARES: */

export async function GET() {
  try {
    const shares = await prisma.share.findMany();
    return new Response(JSON.stringify(shares), { status: 200 });
  } catch (error) {
    return new Response("Error fetching shares", { status: 500 });
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

    return new Response(JSON.stringify(nuevoShare), { status: 201 });
  } catch (error) {
    return new Response("Error creating usuario", { status: 500 });
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

    return new Response(JSON.stringify(shareActualizado), { status: 200 });
  } catch (error) {
    return new Response("Error updating usuario", { status: 500 });
  }
}

/* ELIMINAR UN SHARE */

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const shareId = url.searchParams.get("id");

    if (!shareId) {
      return new Response("Missing shareId parameter", { status: 400 });
    }

    await prisma.share.delete({
      where: { id: shareId },
    });

    return new Response("Share deleted", { status: 200 });
  } catch (error) {
    return new Response("Error deleting share", { status: 500 });
  }
}