import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email ?? "";
        session.user.name = token.name ?? "";
        session.user.foto = token.foto ?? "";
        session.user.nombre_completo = token.nombre_completo ?? "";
        session.user.usuario_verificado = token.usuario_verificado ?? false;
        session.user.insignia = token.insignia ?? null;
      }
      return session;
    },

    async jwt({ token, user, trigger }) {
      if (user) {

        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: {
            standard: true, // Incluimos la relación para acceder a la insignia
          },
        });

        token.id = user.id as string;
        token.email = user.email ?? "";
        token.name = user.name ?? "";
        token.foto = user.foto ?? "";
        token.nombre_completo = user.nombre_completo ?? "";
        token.usuario_verificado = user.usuario_verificado ?? false;
        token.insignia = dbUser?.standard?.insignia || null;
      }
      if (trigger === "update") {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.foto = user.foto;
        token.nombre_completo = user.nombre_completo;
        token.usuario_verificado = user.usuario_verificado;
      }
      return token;
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
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          foto: user.foto,
          nombre_completo: user.nombre_completo,
          usuario_verificado: user.usuario_verificado,
        };
      }


    }),
  ],
};
