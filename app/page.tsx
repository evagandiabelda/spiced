import Image from "next/image"; // Per a optimitzar les imatges.
import Logo from "@/components/icons/Logo";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-20">
        <div className="w-full mx-auto">
          <Logo />
        </div>
        <h1 className="text-2xl font-inter font-bold">
          Página en construcción
        </h1>
      </div>
    </main>
  );
}
