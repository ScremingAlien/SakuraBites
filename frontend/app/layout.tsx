import type { Metadata } from "next";
import { Geist, Sansita, DM_Serif_Display, Bitter, Inter } from "next/font/google";
import "./globals.css";

const garamond = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-garamond",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
});




export const metadata: Metadata = {
  title: "Sukrabites - Your Favourite Recipe App",
  description: "Recipe's which you love",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={`   ${bitter.variable} ${inter.variable} ${garamond.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
