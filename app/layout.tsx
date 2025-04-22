import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
    <html lang="es">

      <body className="antialiased min-h-screen">

        <ThemeProvider>
          <LanguageProvider>
            <SessionWrapper>
              <Header />
              <main className="flex flex-grow">
                {children}
                <Toaster position="bottom-right" />
              </main>
              <Footer />
            </SessionWrapper>
          </LanguageProvider>
        </ThemeProvider>

      </body>

    </html>
  );
}
