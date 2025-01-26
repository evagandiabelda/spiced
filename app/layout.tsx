import type { Metadata } from "next";
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
  return (
    <html lang="es" className="light">
      <body className="antialiased min-h-screen">

        <ThemeProvider>
          <Header />
          <main className="flex items-center justify-center flex-grow min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>

      </body>
    </html>
  );
}
