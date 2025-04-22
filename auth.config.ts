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
      if (token && token.id) {
        session.user = session.user || {};
        session.user.id = token.id as string;
        session.user.email = token.email ?? "";
        session.user.name = token.name ?? "";
        session.user.foto = token.foto ?? "";
        session.user.nombre_real = token.nombre_real ?? "";
        session.user.descripcion_perfil = token.descripcion_perfil ?? "";
        session.user.usuario_verificado = token.usuario_verificado ?? false;
        session.user.insignia = token.insignia ?? null;
        session.user.userType = token.userType ?? null;
      }
      return session;
    },

    async jwt({ token, user, trigger }) {
      if (user && user.id) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: {
            standard: true,
            expert: true,
            admin: true,
          },
        });

        if (dbUser) {
          let userType: "standard" | "expert" | "admin" | null = null;

          // Asignamos el tipo de usuario según la relación
          if (dbUser?.admin) userType = "admin";
          else if (dbUser?.expert) userType = "expert";
          else if (dbUser?.standard) userType = "standard";

          token.id = dbUser?.id ?? user.id;
          token.email = dbUser?.email ?? user.email ?? "";
          token.name = dbUser?.name ?? user.name ?? "";
          token.foto = dbUser?.foto ?? user.foto ?? "";
          token.nombre_real = dbUser?.nombre_real ?? user.nombre_real ?? "";
          token.descripcion_perfil = dbUser?.descripcion_perfil ?? user.descripcion_perfil ?? "";
          token.usuario_verificado = dbUser?.usuario_verificado ?? user.usuario_verificado ?? false;
          token.insignia = dbUser?.standard?.insignia || null;
          token.userType = userType || null;
        } else {
          // Si no se encuentra el usuario en la base de datos, pasamos a las propiedades del usuario de `user`
          token.id = user.id;
          token.email = user.email ?? "";
          token.name = user.name ?? "";
          token.foto = user.foto ?? "";
          token.nombre_real = user.nombre_real ?? "";
          token.descripcion_perfil = user.descripcion_perfil ?? "";
          token.usuario_verificado = user.usuario_verificado ?? false;
          token.insignia = user.insignia || null;
          token.userType = null;  // Si no se encuentra el usuario en la base de datos, asignamos `null` al tipo de usuario
        }

      }

      if (trigger === "update") {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.foto = user.foto;
        token.nombre_real = user.nombre_real;
        token.descripcion_perfil = user.descripcion_perfil || null;
        token.usuario_verificado = user.usuario_verificado;
        token.insignia = user.insignia || null;
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
          nombre_real: user.nombre_real,
          descripcion_perfil: user.descripcion_perfil || null,
          usuario_verificado: user.usuario_verificado,
          userType: userType || null,
          insignia: user.standard?.insignia || null,
        };
      }
    }),

  ],
};
