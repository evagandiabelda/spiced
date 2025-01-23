import Image from "next/image"; // Per a optimitzar les imatges.
import Logo from "@/components/icons/Logo";

export default function Panel() {
    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-20">
                <div className="w-[300px] mx-auto">
                    <Logo />
                </div>
                <h1 className="text-2xl font-inter font-bold">
                    Panel de usuario
                </h1>
            </div>
        </main>
    );
}
