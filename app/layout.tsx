import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";


export const metadata: Metadata = {
  title: "Spiced",
  description: "Brain food for neurospicy folks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">

        <Header />

        {children}

      </body>
    </html>
  );
}
