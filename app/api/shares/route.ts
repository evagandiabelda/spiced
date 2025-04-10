import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { generateSlug } from "@/utils/slug";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS SHARES */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 🔎 Filtro según parámetros de búsqueda (componente Search):
    const query = searchParams.get("query");

    // 🔎 Filtro según Categoría (Feed):
    const categoria = searchParams.get("categoria");

    // 🔎 Filtro según Spices (Feed):
    const spicesParam = searchParams.get("spices");
    const spices = spicesParam?.split(",") ?? [];

    // 🔎 Filtro según Verificados (Feed):
    const verificados = searchParams.get("verificados");

    const shares = await prisma.share.findMany({
      where: query
        ? {
          OR: [
            { titulo: { contains: query, mode: "insensitive" } },
            { texto: { contains: query, mode: "insensitive" } },
          ],
        }
        : {
          AND: {
            share_verificado: verificados === 'verificados' ? true : undefined,
            categorias: categoria
              ? {
                some: {
                  categoria: { id: categoria },
                },
              }
              : undefined,
            spices:
              spices.length > 0
                ? {
                  some: {
                    spice: {
                      nombre: { in: spices },
                    },
                  },
                }
                : undefined,
          },
        },
      include: {
        autor: {
          select: {
            id: true,
            name: true,
            foto: true,
            usuario_verificado: true
          },
        },
        spices: {
          include: {
            spice: true,
          },
        },
        categorias: {
          include: {
            categoria: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      }
    });

    return NextResponse.json({ shares }, { status: 200 });

  } catch (error) {
    console.error("Error obteniendo los shares.", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

/* CREAR UN SHARE */
export async function POST(req: Request) {

  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
  }

  try {
    // Obtener los datos enviados en la petición
    const body = await req.json();
    const { titulo, texto, imgPrincipal, imgSecundaria, spices, categorias } = body;

    // Validar que no falten datos
    if (!titulo || !texto || !imgPrincipal || !spices || !categorias) {
      return NextResponse.json({ error: "Por favor, rellena los campos obligatorios." }, { status: 400 });
    }

    // Generamos un slug.
    const slug = generateSlug(titulo);

    // Si el usuario está verificado ('expert'), se verifica automáticamente el Share:
    let shareVerificado = false;
    if (session.user.usuario_verificado) {
      shareVerificado = true;
    }

    // Insertar el nuevo Share en la base de datos
    const nuevoShare = await prisma.share.create({
      data: {
        titulo,
        texto,
        img_principal: imgPrincipal,
        img_secundaria: imgSecundaria || null,
        share_verificado: shareVerificado,
        spices: spices,
        categorias: categorias,
        slug,
        autor_id: session.user.id, // Asignamos el Share al usuario autenticado
      },
    });

    return NextResponse.json({ message: "Share publicado correctamente.", user: nuevoShare }, { status: 201 });
  } catch (error) {
    console.error("Error al crear el Share.", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

/* Función para reordenar los Shares en orden Aleatorio: */

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}