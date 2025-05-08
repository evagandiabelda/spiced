import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { generateSlug } from "@/lib/slug";
import { comprobarInsignia } from "@/lib/insignias";

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
                  categoria: { nombre: categoria },
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
        denuncias: true,
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

    // Obtener los IDs de los Spices y Categorías:

    const spicesIds = await prisma.spice.findMany({
      where: {
        nombre: { in: spices },
      },
      select: {
        id: true,
      },
    });

    const categoriasIds = await prisma.categoria.findMany({
      where: {
        nombre: { in: categorias },
      },
      select: {
        id: true,
      },
    });

    // Verificar que se hayan encontrado los Spices y Categorías:
    if (spicesIds.length === 0) {
      return NextResponse.json({ error: "No se encontraron los Spices." }, { status: 400 });
    }
    if (categoriasIds.length === 0) {
      return NextResponse.json({ error: "No se encontraron las Categorías." }, { status: 400 });
    }

    // Insertar el nuevo Share en la base de datos
    const nuevoShare = await prisma.share.create({
      data: {
        titulo,
        texto,
        img_principal: imgPrincipal,
        img_secundaria: imgSecundaria || null,
        share_verificado: shareVerificado,
        slug,
        autor_id: session.user.id, // Asignamos el Share al usuario autenticado
      },
    });

    // Generar las relaciones con Spices y Categorías:

    await prisma.shareSpice.createMany({
      data: spicesIds.map(({ id }) => ({
        share_id: nuevoShare.id,
        spice_id: id,
      })),
    });

    await prisma.shareCategoria.createMany({
      data: categoriasIds.map(({ id }) => ({
        share_id: nuevoShare.id,
        categoria_id: id,
      })),
    });

    await comprobarInsignia(session?.user.id);

    return NextResponse.json({ message: "Share publicado correctamente.", user: nuevoShare }, { status: 201 });
  } catch (error) {
    console.error("Error al crear el Share.", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}