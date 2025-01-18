import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-20">
        <img src="/logos/logo-spiced-pos.svg" alt="Logo" className="mx-auto mb-4 w-96" />
        <h1 className="text-2xl font-inter font-bold text-gray-700">
          Página en construcción
        </h1>
      </div>
    </main>
  );
}
