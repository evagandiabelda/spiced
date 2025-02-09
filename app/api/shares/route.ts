import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { generateSlug } from "@/utils/slug";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS SHARES */
export async function GET() {
  try {
    const shares = await prisma.share.findMany({
      include: {
        user: {
          select: { name: true, foto: true }, // Solo traemos el nombre y la foto
        },
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({ shares }, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo los shares:", error);
    return NextResponse.json({ error: "No se pudieron obtener los shares" }, { status: 500 });
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

    const slug = generateSlug(titulo); // Generamos un slug.

    // Insertar el nuevo Share en la base de datos
    const nuevoShare = await prisma.share.create({
      data: {
        titulo,
        texto,
        img_principal: imgPrincipal,
        img_secundaria: imgSecundaria || null,
        slug,
        userId: session.user.id, // Asignamos el Share al usuario autenticado
      },
    });

    return NextResponse.json(nuevoShare, { status: 201 });
  } catch (error) {
    console.error("Error al crear el Share:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

