import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/rajdhani";

export const metadata: Metadata = {
  title: "ChatJMS",
  description: "Chatbot para responder preguntas sobre documentos PDF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="font-rajdhani">
      <body className="antialiased flex flex-col h-screen overflow-hidden bg-white">
        <main className="flex-1 h-full min-h-screen overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
