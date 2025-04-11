import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { notFound } from "next/navigation";
import DetalleShare from "@/components/layout/DetalleShare";

const prisma = new PrismaClient();

export const metadata: Metadata = {
    title: 'Share',
};

export default async function SharePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    const session = await getServerSession(authOptions);

    const slug = (await params).slug;

    // Buscar el Share en la BD:
    const share = await prisma.share.findUnique({
        where: { slug },
        include: {
            spices: {
                include: {
                    spice: true,
                }
            },
            categorias: {
                include: {
                    categoria: true
                }
            },
            comentarios: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            foto: true,
                            usuario_verificado: true,
                        }
                    }
                }
            },
        }
    });

    if (!share) {
        return notFound();
    }

    // Buscar el Autor del Share e la BD:

    const user = await prisma.user.findUnique({
        where: { id: share.autor_id },
    });

    if (!user) {
        return notFound();
    }

    // Comprobar si sigue al autor del Share:

    let yaLoSigue = false;

    if (session?.user?.id && share.autor_id !== session.user.id) {
        const seguimiento = await prisma.seguimiento.findFirst({
            where: {
                seguidor_id: session.user.id,
                seguido_id: share.autor_id,
            },
        });

        yaLoSigue = Boolean(seguimiento);

        return (
            <DetalleShare
                titulo={share.titulo}
                texto={share.texto}
                img_principal={share.img_principal}
                img_secundaria={share.img_secundaria}
                fecha={share.created_at}
                verificado={share.share_verificado}
                autor={user}
                spices={share.spices}
                categorias={share.categorias}
                comentarios={share.comentarios}
                sessionUserId={session?.user?.id ?? null}
                yaLoSigue={yaLoSigue}
            />
        );
    }

}