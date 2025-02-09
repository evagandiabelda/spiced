import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            foto: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string;
        email: string;
        name: string;
        foto?: string;
    }

    interface JWT {
        id: string;
        name: string;
        foto: string;
    }
}
