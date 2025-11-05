import type { Metadata } from "next";
import { Outfit } from "next/font/google"; 
import "./globals.css";
import Navbar from "./components/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "Wayang Nusantara",
  description: "Edukasi Wayang Nusantara — Belajar budaya lewat cerita wayang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${outfit.variable} font-sans antialiased bg-[#fffbf5] text-[#2C1810]`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
