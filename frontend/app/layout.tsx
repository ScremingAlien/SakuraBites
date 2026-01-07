import type { Metadata } from "next";
import { Geist, Sansita } from "next/font/google";
import "./globals.css";

const sansita = Sansita({
  weight: ["400", "700"],  
  subsets: ["latin"],
  variable: "--font-sansita",  
});


const geistMono = Geist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Sukrabites - Your Favourite Recipe App",
  description: "Recipe's which you love",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={`  ${geistMono.variable}  ${sansita.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
