import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS USUARIOS */

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany();
    return NextResponse.json({ message: "Usuarios recuperados correctamente", usuarios: usuarios }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error recuperando los usuarios" }, { status: 500 });
  }
}

/* CREAR UN USUARIO */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre_completo, nombre_usuario, email, password, foto, descripcion_perfil, perfil_privado } = body;

    // 🔹 Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre_completo,
        nombre_usuario,
        email,
        password: hashedPassword, // 🔹 Guardamos la contraseña hasheada
        foto: foto || "/public/iconos/iconos-genericos/icono-usuario.svg",
        descripcion_perfil,
        perfil_privado,
      },
    });

    return NextResponse.json({ message: "Usuario registrado correctamente", usuario: nuevoUsuario }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error registrando el usuario" }, { status: 500 });
  }
}


/* MODIFICAR UN USUARIO */

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, nombre_completo, nombre_usuario, email, password, foto, descripcion_perfil, perfil_privado } = body;

    const data: any = {
      nombre_completo,
      nombre_usuario,
      email,
      foto,
      descripcion_perfil,
      perfil_privado,
    };

    // 🔹 Si se envía una nueva contraseña, la ciframos antes de guardarla
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { id },
      data,
    });

    return NextResponse.json({ message: "Usuario actualizado correctamente", usuario: usuarioActualizado }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error actualizando el usuario" }, { status: 500 });
  }
}

/* ELIMINAR UN USUARIO */

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const usuarioId = url.searchParams.get("id");

    if (!usuarioId) {
      return NextResponse.json({ error: "Missing 'usuarioId' parameter" }, { status: 400 });
    }

    await prisma.usuario.delete({
      where: { id: usuarioId },
    });

    return NextResponse.json({ message: "Usuario eliminado correctamente" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "No se ha podido eliminar el usuario" }, { status: 500 });
  }
}
