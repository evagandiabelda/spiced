import Image from "next/image"; // Per a optimitzar les imatges.
import Logo from "@/components/icons/Logo";

export default function PanelEstandar() {
    return (
        <div className="w-full">
            <div className="w-[300px]">
                <Logo />
            </div>
            <h1 className="text-2xl font-inter font-bold">
                Panel de usuario estándar
            </h1>
        </div>
    );
}
