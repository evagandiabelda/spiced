import Avatar from "@/components/icons/Avatar";
import MenuSidebar from "@/components/layout/MenuSidebar";

type SidebarPanelProps = {
    usuario: "estandar" | "experto";
};

const SidebarPanel = ({ usuario }: SidebarPanelProps) => {

    const usuarioMenu = usuario;
    const href = "/panel-" + usuario;

    return (
        <div className="flex flex-col dark">
            <div>
                <div className="w-full flex flex-row items-center gap-4 pb-7 border-b border-b-[var(--brand2)]">
                    <a href={href} className="w-16">
                        <Avatar borde="blanco" />
                    </a>
                    <a href={href}>
                        <div className="flex flex-col gap-2">
                            <h3 className="m-0">¡Hola, usuario!</h3>
                            <p className="font-normal text-[0.7rem] m-0"><span>Pequeño saltamontes</span></p>
                        </div>
                    </a>
                </div>

                <div className="py-[24px]">
                    <MenuSidebar usuario={usuarioMenu} />
                </div>
            </div>
        </div>
    );

};

export default SidebarPanel;
