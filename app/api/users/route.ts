import { PrismaClient } from "@prisma/client";
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

  if (session?.user.userType !== "admin") {
    return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        admin: true,
        expert: true,
        standard: true,
        seguidos: true,
        seguidores: true,
        shares_publicados: true,
        denuncias_shares: true,
        denuncias_comentarios: true,
      }
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los usuarios.", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}

/* 
--------- CREAR UN USUARIO ---------
Para el registro de usuarios, se usa "app/api/auth/register".
*/