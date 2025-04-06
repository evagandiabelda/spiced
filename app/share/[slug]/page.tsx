import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
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

    const slug = (await params).slug;

    // Buscar el Share en la BD:
    const share = await prisma.share.findUnique({
        where: { slug },
    });

    if (!share) {
        return notFound();
    }

    // Buscar el Usuario del Share e la BD:
    const user = await prisma.user.findUnique({
        where: { id: share.autor_id },
    });

    if (!user) {
        return notFound();
    }

    return (
        <DetalleShare
            titulo={share.titulo}
            texto={share.texto}
            img_principal={share.img_principal}
            img_secundaria={share.img_secundaria}
            fecha={share.created_at}
            user={user}
        />
    );
}
