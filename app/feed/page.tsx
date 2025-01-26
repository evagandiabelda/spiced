import Image from "next/image"; // Per a optimitzar les imatges.
import Logo from "@/components/icons/Logo";

export default function Feed() {
    return (
        <div className="w-full h-100 flex flex-col justify-center items-center text-center space-y-20 mx-auto">
            <div className="w-[300px] mx-auto">
                <Logo />
            </div>
            <h1 className="text-2xl font-inter font-bold">
                Feed de publicaciones
            </h1>
        </div>
    );
}
