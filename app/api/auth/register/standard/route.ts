import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { obtenerAvatarAleatorio } from "@/lib/avatars";
import { Genero } from "@prisma/client";

/*  --------- REGISTRO DE USUARIO ESTÁNDAR --------- */

export async function POST(req: Request) {
    try {
        const { nombre_real, name, email, password, foto, fecha_nacimiento, genero, spices, categorias } = await req.json();

        // Validar que no falten datos
        if (!nombre_real || !name || !email || !password || !fecha_nacimiento || !genero) {
            return NextResponse.json({ error: "Por favor, rellena los campos son obligatorios." }, { status: 400 });
        }

        // Buscar el género correspondiente en el enum, sin importar mayúsculas/minúsculas
        const generoValido = Object.values(Genero).find(
            (g) => g.toLowerCase() === genero.toLowerCase()
        );

        if (!generoValido) {
            throw new Error("Valor de género no válido");
        }

        // Verificar si el email ya está en uso
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Este email ya está registrado." }, { status: 400 });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario en la base de datos
        const newUser = await prisma.user.create({
            data: {
                nombre_real,
                name,
                email,
                password: hashedPassword,
                foto: foto || obtenerAvatarAleatorio(),
                descripcion_perfil: "¡Hola! Soy nuev@ por aquí.",
            },
        });

        // Crearlo como 'standard' a partir del usuario genérico:
        const newStandardUser = await prisma.standard.create({
            data: {
                id: newUser.id,
                fecha_nacimiento: new Date(fecha_nacimiento),
                genero: genero,
            }
        });

        // Añadir relación con Spices:

        if (Array.isArray(spices) && spices.length > 0) {
            // Buscar las spices por nombre
            const spicesEnBD = await prisma.spice.findMany({
                where: {
                    nombre: {
                        in: spices,
                        mode: 'insensitive',
                    },
                },
                select: {
                    id: true,
                },
            });

            // Extraer los IDs
            const spiceIds = spicesEnBD.map((spice) => spice.id);

            // Insertar relaciones en la tabla intermedia
            if (spiceIds.length > 0) {
                await prisma.usuarioSpice.createMany({
                    data: spiceIds.map((spice_id: string) => ({
                        user_id: newUser.id,
                        spice_id,
                    })),
                    skipDuplicates: true,
                });
            }
        }

        // Añadir relación con Categorías:

        if (Array.isArray(categorias) && categorias.length > 0) {
            // Buscar las categorías por nombre
            const categoriasEnBD = await prisma.categoria.findMany({
                where: {
                    nombre: {
                        in: categorias,
                        mode: 'insensitive',
                    },
                },
                select: {
                    id: true,
                },
            });

            // Extraer los IDs
            const categoriaIds = categoriasEnBD.map((cat) => cat.id);

            // Insertar relaciones en la tabla intermedia
            if (categoriaIds.length > 0) {
                await prisma.usuarioCategoria.createMany({
                    data: categoriaIds.map((categoria_id: string) => ({
                        user_id: newUser.id,
                        categoria_id,
                    })),
                    skipDuplicates: true,
                });
            }
        }

        return NextResponse.json({ message: "Usuario registrado con éxito.", user: newStandardUser }, { status: 201 });
    } catch (error) {
        console.error("Error en el registro de usuario.", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
