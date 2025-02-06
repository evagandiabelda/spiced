import Avatar from "@/components/icons/Avatar";
import MenuSidebar from "@/components/layout/panel/MenuSidebar";

type SidebarPanelProps = {
    usuario: "estandar" | "experto";
};

const SidebarPanel = ({ usuario }: SidebarPanelProps) => {

    const href = "/panel-" + usuario + "/configuracion";

    return (
        <div className="w-full flex flex-col">
            <div>
                <div className="w-full flex flex-row items-center gap-4 pb-7 border-b border-b-[var(--brand2)] dark:border-b-[var(--gris4)]">
                    {/* Avatar Modo Claro */}
                    <a href={href} className="mobile:w-12 laptop:w-16 dark:hidden">
                        <Avatar borde="blanco" />
                    </a>
                    {/* Avatar Modo Oscuro */}
                    <a href={href} className="mobile:w-12 laptop:w-16 hidden dark:block">
                        <Avatar borde="color" />
                    </a>
                    <div className="mobile:block tablet:hidden laptop:block flex flex-col gap-2">
                        <h3 className="m-0 text-[var(--blanco)] dark:text-[var(--gris3)]">¡Hola, usuario!</h3>
                        <p className="mobile:hidden laptop:block font-normal text-[0.7rem] m-0"><span className="text-[var(--blanco)] dark:text-[var(--gris3)]">Pequeño saltamontes</span></p>
                    </div>
                </div>

                <div className="py-[24px]">
                    <MenuSidebar usuario={usuario} />
                </div>
            </div>
        </div>
    );

};

export default SidebarPanel;
