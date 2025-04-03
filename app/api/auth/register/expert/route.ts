import { prisma } from "@/app/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { obtenerAvatarAleatorio } from "@/lib/avatars";

/*  --------- REGISTRO DE USUARIO EXPERTO --------- */

export async function POST(req: Request) {
    try {
        const { nombre_completo, name, email, password, foto, num_colegiado, anyos_experiencia, lista_titulaciones } = await req.json();

        // Validar que no falten datos
        if (!nombre_completo || !name || !email || !password || !num_colegiado || !anyos_experiencia || !lista_titulaciones) {
            return NextResponse.json({ error: "Por favor, rellena los campos son obligatorios." }, { status: 400 });
        }

        // Verificar si el email ya está en uso
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Este email ya está registrado." }, { status: 400 });
        }

        // Hashear la contraseña
        const hashedPassword = await hash(password, 10);

        // Crear el usuario en la base de datos
        const newUser = await prisma.user.create({
            data: {
                nombre_completo,
                name,
                email,
                password: hashedPassword,
                foto: foto || obtenerAvatarAleatorio(),
                descripcion_perfil: "¡Hola! Soy nuev@ por aquí.",
            },
        });

        // Crearlo como 'expert' a partir del usuario genérico:
        const newExpertUser = await prisma.expert.create({
            data: {
                id: newUser.id,
                num_colegiado: num_colegiado,
                anyos_experiencia: anyos_experiencia,
                lista_titulaciones: lista_titulaciones,
            }
        });

        return NextResponse.json({ message: "Usuario registrado con éxito", user: newExpertUser }, { status: 201 });
    } catch (error) {
        console.error("Error en el registro de usuario.", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
