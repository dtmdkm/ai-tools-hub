import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "The ultimate directory for AI tools and platforms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0A0A0B] text-[#EDEDED] antialiased selection:bg-[#A259FF] selection:text-white min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
