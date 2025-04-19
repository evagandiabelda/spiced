import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
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
        session.user.userType = token.userType ?? null;
      }
      return session;
    },

    async jwt({ token, user, trigger }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: {
            standard: true,
            expert: true,
            admin: true,
          },
        });

        let userType: "standard" | "expert" | "admin" | null = null;

        // Asignamos el tipo de usuario según la relación
        if (dbUser?.admin) userType = "admin";
        else if (dbUser?.expert) userType = "expert";
        else if (dbUser?.standard) userType = "standard";

        token.id = dbUser?.id ?? user.id;
        token.email = dbUser?.email ?? user.email ?? "";
        token.name = dbUser?.name ?? user.name ?? "";
        token.foto = dbUser?.foto ?? user.foto ?? "";
        token.nombre_completo = dbUser?.nombre_completo ?? user.nombre_completo ?? "";
        token.usuario_verificado = dbUser?.usuario_verificado ?? user.usuario_verificado ?? false;
        token.insignia = dbUser?.standard?.insignia || null;
        token.userType = userType || null;
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

        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            standard: true,
            expert: true,
            admin: true,
          },
        });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;

        // Determinamos el tipo de usuario basado en las relaciones con las tablas
        let userType: "standard" | "expert" | "admin" | null = null;
        if (user.admin) userType = "admin";
        else if (user.expert) userType = "expert";
        else if (user.standard) userType = "standard";

        // Retornamos el objeto con la propiedad 'role'
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          foto: user.foto,
          nombre_completo: user.nombre_completo,
          usuario_verificado: user.usuario_verificado,
          userType: userType || null,
        };
      }
    }),

  ],
};
