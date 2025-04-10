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
                });

                if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
                    throw new Error("Credenciales incorrectas");
                }

                /* DATOS DEL USUARIO QUE DEVUELVE PARA SER USADOS EN EL PANEL: */

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    nombre_completo: user.nombre_completo,
                    foto: user.foto,
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
            }
            if (trigger === "update") {
                token.id = user.id;
                token.name = user.name;
                token.nombre_completo = user.nombre_completo;
                token.foto = user.foto;
            }
            return token;
        },
        async session({ session, token }) {

            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.nombre_completo = token.nombre_completo as string;
                session.user.foto = token.foto as string;
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