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

/* 
--------- CREAR UN USUARIO ESTÁNDAR (desde el panel de Admin) ---------
Para el registro de usuarios desde la web, se usa "app/api/auth/register/route.ts/POST".
*/
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre_completo, name, email, password, foto, descripcion_perfil, fecha_nacimiento, genero } = body;

    // Validar que no falten datos
    if (!nombre_completo || !name || !email || !password || !fecha_nacimiento || !genero) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Verificar si el email ya está en uso
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        nombre_completo,
        name,
        email,
        password: hashedPassword,
        foto: foto || "/public/iconos/iconos-genericos/icono-usuario.svg",
        descripcion_perfil: descripcion_perfil || "¡Hola! Soy nuev@ por aquí.",
      },
    });

    // Crearlo como 'standard' a partir del usuario genérico:
    const newStandardUser = await prisma.standard.create({
      data: {
        id: newUser.id,
        fecha_nacimiento: fecha_nacimiento,
        genero: genero,
      }
    });

    return NextResponse.json({ message: "Usuario registrado correctamente", user: newStandardUser }, { status: 201 });
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
