import { Metadata } from "next";
import PerfilUsuario from "@/components/layout/PerfilUsuario";

export const metadata: Metadata = {
    title: 'Perfil',
};

export default async function PerfilPage({
    params,
}: {
    params: Promise<{ name: string }>
}) {

    const name = (await params).name;

    return (
        <PerfilUsuario name={name} />
    );

}