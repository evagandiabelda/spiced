import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUser(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        standard: true,
        expert: true,
        admin: true,
      },
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {

          // Determinamos el tipo de usuario basándonos en las relaciones con las tablas
          let userType: "standard" | "expert" | "admin" | null = null;

          if (user.admin) userType = "admin";
          else if (user.expert) userType = "expert";
          else if (user.standard) userType = "standard";

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            foto: user.foto,
            nombre_real: user.nombre_real,
            usuario_verificado: user.usuario_verificado,
            userType: userType,
          };
        }

        console.log("Invalid credentials");
        return null;
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.foto = token.foto as string;
        session.user.nombre_real = token.nombre_real as string;
        session.user.usuario_verificado = token.usuario_verificado as boolean;
        session.user.userType = token.userType as string;
      }
      return session;
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.foto = user.foto;
        token.nombre_real = user.nombre_real;
        token.usuario_verificado = user.usuario_verificado;
        token.userType = user.userType;
      }
      if (trigger === "update") {
        token.id = user.id;
        token.name = user.name;
        token.foto = user.foto;
        token.nombre_real = user.nombre_real;
        token.usuario_verificado = user.usuario_verificado;
        token.userType = user.userType;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
