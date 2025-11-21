import type { Metadata } from "next";
import { Outfit, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/context/AuthContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
});

export const metadata: Metadata = {
  title: "Haqiqa - Islamic Content Platform",
  description: "Share and discover Islamic knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${libreBaskerville.variable} antialiased font-sans bg-background text-foreground`}
      >
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
