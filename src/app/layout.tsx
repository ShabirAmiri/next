import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poiret_One } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poiret = Poiret_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mohammad Younass Mohmand",
  description: "Business Leader",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poiret.className}>{children}</body>
    </html>
  );
}
