import { Metadata } from "next";
import { Suspense } from "react";
import DetalleShare from "@/components/layout/DetalleShare";
import { DetalleShareSkeleton } from "@/components/layout/DetalleShareSkeleton";

export const metadata: Metadata = {
    title: 'Share',
};

export default async function SharePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    return (
        <Suspense fallback={<DetalleShareSkeleton />}>
            <DetalleShare
                slug={(await params).slug}
            />
        </Suspense>
    );

}