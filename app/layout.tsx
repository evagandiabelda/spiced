
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/context/ThemeContext';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeInitializer from "@/components/ThemeInitializer";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata: Metadata = {
  title: {
    template: '%s | Spiced',
    default: 'Spiced',
  },
  description: "Brain food for neurospicy folks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es" className="light">
      <head>
        <meta name="color-scheme" content="light" />
      </head>

      <body className="antialiased min-h-screen">

        <ThemeProvider>
          <ThemeInitializer />
          <SessionWrapper>
            <Header />
            <main className="flex flex-grow">
              {children}
            </main>
            <Footer />
          </SessionWrapper>
        </ThemeProvider>

      </body>

    </html>
  );
}
