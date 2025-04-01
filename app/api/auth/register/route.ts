import { prisma } from "@/app/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { obtenerAvatarAleatorio } from "@/lib/avatars";

/* 
--------- REGISTRO DE USUARIO ESTÁNDAR (desde la web) ---------
Para el registro de usuarios desde el panel de Admin, se usa "app/api/users/route.ts/POST".
*/

export async function POST(req: Request) {
    try {
        const { nombre_completo, name, email, password, foto, fecha_nacimiento, genero } = await req.json();

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

        // Crearlo como 'standard' a partir del usuario genérico:
        const newStandardUser = await prisma.standard.create({
            data: {
                id: newUser.id,
                fecha_nacimiento: fecha_nacimiento,
                genero: genero,
            }
        });

        return NextResponse.json({ message: "Usuario registrado con éxito", user: newStandardUser }, { status: 201 });
    } catch (error) {
        console.error("Error en el registro de usuario:", error);
        return NextResponse.json({ error: "Error en el servidor. Inténtelo más tarde." }, { status: 500 });
    }
}
