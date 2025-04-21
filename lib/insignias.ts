import { PrismaClient, Insignia } from "@prisma/client";

const prisma = new PrismaClient();

/* FUNCIÓN PARA COMPROBAR SI UN USUARIO CUMPLE LOS REQUISITOS PARA CAMBIAR DE INSIGNIA: */

export async function comprobarInsignia(userId: string) {

    const usuario = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            standard: true,
            shares_publicados: {
                select: {
                    share_verificado: true,
                    comentarios: true,
                    guardados: true,
                }
            },
        },
    });

    if (!usuario || !usuario.standard) return;

    // ---------------------------------------------------------------------

    const numShares = usuario.shares_publicados.length;

    const numComentarios = usuario.shares_publicados.reduce(
        (acc, share) => acc + share.comentarios.length,
        0
    );

    const numGuardados = usuario.shares_publicados.reduce(
        (acc, share) => acc + share.guardados.length,
        0
    );

    const numSharesVerificados = usuario.shares_publicados.filter(
        (share) => share.share_verificado
    ).length;

    // ---------------------------------------------------------------------

    // INSIGNIA ACTUAL (por defecto, será la 1):
    let nuevaInsignia = usuario.standard.insignia;

    // INSIGNIA 2:
    if (numShares >= 5 && numComentarios >= 10 && numGuardados >= 3) {
        nuevaInsignia = Insignia.cacahuete_sabio;
    }

    // INSIGNIA 3:
    if (numSharesVerificados >= 10 && numComentarios >= 50 && numGuardados >= 20) {
        nuevaInsignia = Insignia.cactus_legendario;
    }

    // ---------------------------------------------------------------------

    if (nuevaInsignia !== usuario.standard.insignia) {
        await prisma.standard.update({
            where: { id: usuario.standard.id },
            data: { insignia: nuevaInsignia },
        });
    }
}
