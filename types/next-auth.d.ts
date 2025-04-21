import NextAuth from "next-auth";
import { Insignia } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            foto: string;
            nombre_real: string;
            usuario_verificado: boolean;
            userType: "admin" | "expert" | "standard" | null;
            insignia?: Insignia | null;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string;
        email: string;
        name: string;
        foto?: string;
        nombre_real: string;
        usuario_verificado: boolean;
        userType: "admin" | "expert" | "standard" | null;
        insignia?: Insignia | null;
    }

    interface JWT {
        id: string;
        name: string;
        foto: string;
        nombre_real: string;
        usuario_verificado: boolean;
        userType: "admin" | "expert" | "standard" | null;
        insignia?: Insignia | null;
    }
}
