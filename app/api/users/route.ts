import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* 
--------- LISTAR TODOS LOS USUARIOS (desde el panel de Admin) ---------
NO interesa listar TODOS los usuarios desde la web, por lo que no se filtran los datos de los usuarios.
Desde el panel de Admin sí interesa ver todos los datos de los usuarios.
*/
export async function GET() {

  const session = await getServerSession(authOptions);

  if (!session?.user?.is_admin) {
    return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los usuarios.", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

/* 
--------- CREAR UN USUARIO ESTÁNDAR (desde el panel de Admin) ---------
Para el registro de usuarios desde la web, se usa "app/api/auth/register/route.ts/POST".
*/
export async function POST(request: Request) {

  const session = await getServerSession(authOptions);

  if (!session?.user?.is_admin) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { nombre_completo, name, email, password, foto, descripcion_perfil, fecha_nacimiento, genero } = body;

    // Validar que no falten datos
    if (!nombre_completo || !name || !email || !password || !fecha_nacimiento || !genero) {
      return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
    }

    // Verificar si el email ya está en uso
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Este email ya está registrado." }, { status: 400 });
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

    return NextResponse.json({ message: "Usuario registrado correctamente.", user: newStandardUser }, { status: 201 });
  } catch (error) {
    console.error("Error al crear el usuario.", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}