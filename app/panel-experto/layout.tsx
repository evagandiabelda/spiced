import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import SidebarPanel from "@/components/panel/SidebarPanel";

export const metadata: Metadata = {
    title: 'Tu Panel',
};

export default async function PanelEstandarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    if (session.user.userType !== "expert") {
        if (session.user.userType === "standard") {
            redirect("/panel-estandar");
        } else if (session.user.userType === "admin") {
            redirect("/panel-admin");
        } else {
            redirect("/"); // fallback por si acaso
        }
    }

    return (
        <>
            {/* CAJA MODO CLARO */}
            <div className="w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start pt-[30px] pb-0 dark:hidden fondo-degradado2">
                {/* CAJA SIDEBAR */}
                <section className="h-full mobile:w-full tablet:w-fit laptop:w-full laptop:max-w-[360px] px-[2rem] mobile:py-0 tablet:py-5">
                    <SidebarPanel usuario="experto" />
                </section>

                {/* CAJA PRINCIPAL */}
                <section className="flex flex-col w-full h-full p-[4rem] pb-[6rem] rounded-t-[28px] tablet:rounded-t-none tablet:rounded-tl-[28px] bg-[var(--gris1)]">
                    {children}
                </section>
            </div>

            {/* CAJA MODO OSCURO */}
            <div className="w-full flex mobile:flex-col tablet:flex-row gap-0 mobile:justify-start tablet:justify-between align-start pt-[30px] pb-0 hidden dark:flex bg-[var(--gris4)]">
                {/* CAJA SIDEBAR */}
                <section className="h-full mobile:w-full tablet:w-fit laptop:w-full laptop:max-w-[360px] px-[2rem] mobile:py-0 tablet:py-5">
                    <SidebarPanel usuario="experto" />
                </section>

                {/* CAJA PRINCIPAL */}
                <section className="flex flex-col w-full h-full p-[4rem] pb-[6rem] rounded-t-[28px] tablet:rounded-t-none tablet:rounded-tl-[28px] bg-[var(--gris5)]">
                    {children}
                </section>
            </div>
        </>
    );
}
