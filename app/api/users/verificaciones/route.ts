import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const prisma = new PrismaClient();

/* OBTENER TODOS LOS USUARIOS EXPERT POR VERIFICAR */
// Se usa desde el Panel de Admin para ver las solicitudes de verificación.

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (session?.user.userType !== "admin") {
            return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            where: {
                usuario_verificado: false,
                AND: [
                    { NOT: { expert: null } },   // Tiene datos en `expert`
                    { standard: null },          // No tiene datos en `standard`
                    { admin: null },             // No tiene datos en `admin`
                ],
            },
            select: {
                id: true,
                nombre_real: true,
                name: true,
                foto: true,
                created_at: true,
                expert: {
                    select: {
                        num_colegiado: true,
                        anyos_experiencia: true,
                        lista_titulaciones: true,
                    }
                },
            }
        });

        if (!users) {
            return NextResponse.json({ error: "No se han podido obtener los usuarios pendientes de verificación." }, { status: 404 });
        }

        return NextResponse.json({ users }, { status: 200 });

    } catch (error) {
        console.error("Error obteniendo los usuarios pendientes de verificación.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}