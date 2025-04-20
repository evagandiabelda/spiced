import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/* OBTENER TODOS LOS DATOS DEL USUARIO EN SESIÓN */
// Incluidos los shares creados y guardados, los spices y las categorías seguidas, etc.

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
        return NextResponse.json({ error: "Usuario no autenticado." }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                admin: true,      // Si el usuario es admin, incluirá los datos de "admin"
                expert: true,     // Si el usuario es expert, incluirá los datos de "expert"
                standard: true,   // Si el usuario es standard, incluirá los datos de "standard"

                spices_seguidos: {
                    include: {
                        spice: true,
                    }
                },
                categorias_seguidas: {
                    include: {
                        categoria: true,
                    }
                },
                shares_publicados: {
                    include: {
                        comentarios: true,
                    },
                    orderBy: { created_at: "desc" },
                },
                shares_guardados: {
                    include: {
                        share: true,
                    },
                },
                comentarios: true,
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        // Determinar el tipo de usuario (Aquí se puede hacer de forma sencilla sin necesidad de utilizar 'is_admin' o 'usuario_verificado' para determinar el rol).
        const rol = user.admin ? 'admin' : user.expert ? 'expert' : user.standard ? 'standard' : 'unknown';

        return NextResponse.json({
            id: user.id,
            nombre_real: user.nombre_real,
            name: user.name,
            email: user.email,
            foto: user.foto,
            descripcion_perfil: user.descripcion_perfil,
            rol: rol,
            spices_seguidos: user.spices_seguidos.map(spice => spice.spice),
            categorias_seguidas: user.categorias_seguidas.map(categoria => categoria.categoria),
            shares_publicados: user.shares_publicados,
            shares_guardados: user.shares_guardados,
            comentarios: user.comentarios,
        }, { status: 200 });

    } catch (error) {
        console.error("Error al obtener la información del usuario.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* MODIFICAR UN USUARIO */

export async function PATCH(req: Request) {

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
    }

    try {
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

        return NextResponse.json({ message: "Usuario actualizado correctamente.", user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error actualizando usuario.", error);
        return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
    }
}

/* ELIMINAR UN USUARIO */

export async function DELETE(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Usuario no autorizado." }, { status: 401 });
    }

    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("id");

        if (!userId) {
            return NextResponse.json({ error: "Falta el ID del usuario." }, { status: 400 });
        }

        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ message: "Usuario eliminado correctamente." }, { status: 200 });
    } catch (error) {
        console.error("Error eliminando usuario.", error);
        return NextResponse.json({ message: "Error interno del servidor.", error: error }, { status: 500 });
    }
}
