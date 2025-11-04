import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // ✅ pakai Outfit font
import "./globals.css";
import Navbar from "./components/Navbar";

// ✅ Inisialisasi font Outfit
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // kamu bisa ubah sesuai kebutuhan
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
