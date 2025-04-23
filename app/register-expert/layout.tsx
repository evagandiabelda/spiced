import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import RegistroSidebar from "@/components/layout/RegistroSidebar";

export const metadata: Metadata = {
    title: 'Regístrate',
};

export default async function PanelEstandarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession(authOptions);

    if (session?.user.userType === "standard") {
        redirect("/panel-estandar");
    } else if (session?.user.userType === "expert") {
        redirect("/panel-experto");
    } else if (session?.user.userType === "admin") {
        redirect("/panel-admin");
    }

    return (
        <div className='w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start'>
            {/* CAJA SIDEBAR: */}
            <section className='dark h-full mobile:w-full laptop:w-col4'>
                <RegistroSidebar
                    usuario="expert"
                />
            </section>

            {/* CAJA PRINCIPAL: */}
            <section className='flex flex-col w-full h-full px-col1 pt-[4rem] pb-[6rem] bg-[var(--gris1)] dark:bg-[var(--gris5)]'>
                {children}
            </section>
        </div>
    );
}
