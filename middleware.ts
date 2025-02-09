import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/panel-estandar", // Redirige al login si no está autenticado
    },
  }
);

// Especificar qué rutas requieren autenticación
export const config = {
  matcher: ["/panel-estandar/:path*"], // Protege todas las rutas dentro de /panel/
};
