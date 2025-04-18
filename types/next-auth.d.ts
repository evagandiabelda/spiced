import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            foto: string;
            nombre_completo: string;
            usuario_verificado: boolean;
            userType: "admin" | "expert" | "standard" | null;
            insignia?: string | null;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string;
        email: string;
        name: string;
        foto?: string;
        nombre_completo: string;
        usuario_verificado: boolean;
        userType: "admin" | "expert" | "standard" | null;
        insignia?: string | null;
    }

    interface JWT {
        id: string;
        name: string;
        foto: string;
        nombre_completo: string;
        usuario_verificado: boolean;
        userType: "admin" | "expert" | "standard" | null;
        insignia?: string | null;
    }
}
