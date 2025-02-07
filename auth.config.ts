import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/prisma";
import { compare } from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/panel-estandar");

      if (isOnDashboard) {
        return isLoggedIn;
      }

      return true;
    }
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) {
          throw new Error("Email y contraseña son requeridos");
        }

        const usuario = await prisma.usuario.findUnique({
          where: { email },
        });

        if (!usuario) {
          throw new Error("No existe un usuario con ese email");
        }

        const passwordMatch = await compare(password, usuario.password);

        if (!passwordMatch) {
          throw new Error("Contraseña incorrecta");
        }

        return {
          id: usuario.id.toString(),
          name: usuario.nombre_usuario,
          email: usuario.email,
        };
      }
    }),
  ],
} satisfies NextAuthConfig;
