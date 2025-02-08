import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

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
export async function POST(req: Request) {
  try {
    // Obtener los datos enviados en la petición
    const body = await req.json();
    const { titulo, texto, imgPrincipal, imgSecundaria } = body;

    // Obtener sesión del usuario
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Insertar el nuevo Share en la base de datos
    const nuevoShare = await prisma.share.create({
      data: {
        titulo,
        texto,
        img_principal: imgPrincipal,
        img_secundaria: imgSecundaria || null,
        userId: session.user.id, // Asignamos el Share al usuario autenticado
      },
    });

    return NextResponse.json(nuevoShare, { status: 201 });
  } catch (error) {
    console.error("Error al crear el Share:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
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
