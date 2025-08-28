import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar/page"
export const metadata: Metadata = {
  title: "Prescripto",
  description: "Healthcare platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
