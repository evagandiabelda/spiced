import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS USUARIOS */

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany();
    return new Response(JSON.stringify(usuarios), { status: 200 });
  } catch (error) {
    return new Response("Error fetching usuarios", { status: 500 });
  }
}

/* CREAR UN USUARIO */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre_completo, nombre_usuario, email, password, foto, descripcion_perfil, perfil_privado } = body;

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre_completo,
        nombre_usuario,
        email,
        password,
        foto: foto || "/public/iconos/iconos-genericos/icono-usuario.svg",
        descripcion_perfil,
        perfil_privado,
      },
    });

    return new Response(JSON.stringify(nuevoUsuario), { status: 201 });
  } catch (error) {
    return new Response("Error creating usuario", { status: 500 });
  }
}

/* MODIFICAR UN USUARIO */

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, nombre_completo, nombre_usuario, email, password, foto, descripcion_perfil, perfil_privado } = body;

    const usuarioActualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nombre_completo,
        nombre_usuario,
        email,
        password,
        foto,
        descripcion_perfil,
        perfil_privado,
      },
    });

    return new Response(JSON.stringify(usuarioActualizado), { status: 200 });
  } catch (error) {
    return new Response("Error updating usuario", { status: 500 });
  }
}

/* ELIMINAR UN USUARIO */

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const usuarioId = url.searchParams.get("id");

    if (!usuarioId) {
      return new Response("Missing userId parameter", { status: 400 });
    }

    await prisma.usuario.delete({
      where: { id: usuarioId },
    });

    return new Response("Usuario deleted", { status: 200 });
  } catch (error) {
    return new Response("Error deleting usuario", { status: 500 });
  }
}
