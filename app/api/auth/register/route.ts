import { prisma } from "@/app/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { nombre_completo, name, email, password } = await req.json();

        // Validar que no falten datos
        if (!nombre_completo || !name || !email || !password) {
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
            },
        });

        return NextResponse.json({ message: "Usuario registrado con éxito", user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Error en el registro de usuario:", error);
        return NextResponse.json({ error: "Error en el servidor. Inténtelo más tarde." }, { status: 500 });
    }
}
