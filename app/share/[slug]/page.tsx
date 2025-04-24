import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
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

    return (
        <Suspense fallback="Cargando Share...">
            <DetalleShare
                slug={(await params).slug}
            />
        </Suspense>
    );

}