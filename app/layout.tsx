import type { Metadata } from "next";
import { useEffect } from "react";
import "./globals.css";
import { ThemeProvider } from '@/context/ThemeContext';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export const metadata: Metadata = {
  title: "Spiced",
  description: "Brain food for neurospicy folks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
  }, []);

  return (
    <html lang="es" className="light">
      <head>
        <meta name="color-scheme" content="light" />
      </head>

      <body className="antialiased min-h-screen">

        <ThemeProvider>
          <Header />
          <main className="flex flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>

      </body>

    </html>
  );
}
