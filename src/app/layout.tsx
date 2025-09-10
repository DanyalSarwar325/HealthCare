import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import {FooterPage} from "@/app/components/footer"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // pick weights you need
});

import AuthProvider from "@/context/AuthProvider";
import { Navbar } from "./components/Navbar";
export const metadata: Metadata = {
  title: "Prescripto",
  description: "Healthcare platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
      <body className="{nunito.classname}">

        <Navbar />
        {children}
        <FooterPage/>
      
      </body>
      </AuthProvider>
    </html>
  );
}
