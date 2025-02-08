import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/* LISTAR TODOS LOS USUARIOS */
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ message: "Usuarios recuperados correctamente", users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error recuperando los usuarios", error: error }, { status: 500 });
  }
}

/* CREAR UN USUARIO */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre_completo, name, email, password, foto, descripcion_perfil, perfil_privado } = body;

    // 🔹 Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        nombre_completo,
        name,
        email,
        password: hashedPassword, // 🔹 Guardamos la contraseña hasheada
        foto: foto || "/public/iconos/iconos-genericos/icono-usuario.svg",
        descripcion_perfil,
        perfil_privado,
      },
    });

    return NextResponse.json({ message: "Usuario registrado correctamente", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error registrando el usuario", error: error }, { status: 500 });
  }
}

/* MODIFICAR UN USUARIO */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, nombre_completo, name, email, password, foto, descripcion_perfil, perfil_privado } = body;

    const data: Partial<{
      nombre_completo: string;
      name: string;
      email: string;
      password?: string;
      foto?: string;
      descripcion_perfil?: string;
      perfil_privado?: boolean;
    }> = {
      nombre_completo,
      name,
      email,
      foto,
      descripcion_perfil,
      perfil_privado,
    };

    // 🔹 Si se envía una nueva contraseña, la ciframos antes de guardarla
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json({ message: "Usuario actualizado correctamente", user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error actualizando el usuario", error: error }, { status: 500 });
  }
}

/* ELIMINAR UN USUARIO */
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "Missing 'userId' parameter" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "Usuario eliminado correctamente" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "No se ha podido eliminar el usuario", error: error }, { status: 500 });
  }
}
