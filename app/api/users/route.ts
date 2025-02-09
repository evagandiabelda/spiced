import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

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
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const requestData = await req.json();

    // Filtrar solo los campos que tienen valores definidos y no son cadenas vacías
    const updateData: Record<string, any> = Object.fromEntries(
      Object.entries(requestData).filter(([_, value]) => value !== undefined && value !== "")
    );

    // Si el usuario está cambiando la contraseña, la encriptamos antes de guardar
    if (typeof updateData.password === "string") {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData, // Solo se enviarán los campos que tengan un valor definido
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
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
