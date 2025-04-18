import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Faltan credenciales");
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: {
                        admin: true,   // Incluimos la relación con 'admin'
                        expert: true,  // Incluimos la relación con 'expert'
                        standard: true, // Incluimos la relación con 'standard'
                    },
                });

                if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
                    throw new Error("Credenciales incorrectas");
                }

                // Asignamos un tipo de usuario válido (sin permitir `null`)
                let userType: "standard" | "expert" | "admin" = "standard"; // Valor predeterminado

                if (user.admin) userType = "admin";
                else if (user.expert) userType = "expert";

                /* DATOS DEL USUARIO QUE DEVUELVE PARA SER USADOS EN EL PANEL: */

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    nombre_completo: user.nombre_completo,
                    foto: user.foto,
                    usuario_verificado: user.usuario_verificado,
                    userType,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.nombre_completo = user.nombre_completo;
                token.foto = user.foto;
                token.usuario_verificado = user.usuario_verificado;
                token.userType = user.userType;
            }
            if (trigger === "update") {
                token.id = user.id;
                token.name = user.name;
                token.nombre_completo = user.nombre_completo;
                token.foto = user.foto;
                token.usuario_verificado = user.usuario_verificado;
                token.userType = user.userType;
            }
            return token;
        },
        async session({ session, token }) {

            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.nombre_completo = token.nombre_completo as string;
                session.user.foto = token.foto as string;
                session.user.usuario_verificado = token.usuario_verificado as boolean;
                session.user.userType = token.userType as string;
            }

            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
};