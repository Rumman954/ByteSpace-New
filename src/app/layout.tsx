import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ByteSpace - Online Learning Platform",
  description: "Get access to hundreds of courses. Discover your passion, build your skills with ByteSpace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.variable} font-sans min-h-screen antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
