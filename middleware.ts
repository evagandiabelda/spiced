import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized({ token }) {
            return !!token; // Solo permite el acceso si el usuario está autenticado
        },
    },
    pages: {
        signIn: "/login",
    },
});

export const config = {
    matcher: ["/panel-estandar/:path*"], // Protege solo el panel de usuario
};
