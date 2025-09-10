// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // install: npm install lucide-react
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // pick weights you need
});


export const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "HOME", href: "/home" },
    { name: "ALL DOCTORS", href: "/doctors" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className={`w-full border-b bg-white sticky top-0 z-50 ${nunito.className}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/next.svg" alt="Prescripto Logo" width={32} height={32} />
          <span className="text-2xl font-semibold text-[#1A237E]">Prescripto</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative pb-1 text-lg  font-bold transition ${
                pathname === link.href ? "text-[#1A237E]" : "text-black"
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 rounded"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/admin"
            className="px-4 py-1 border rounded-full text-sm font-medium text-black hover:bg-gray-100"
          >
            Admin Panel
          </Link>
          <Link
            href="/signUp"
            className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700"
          >
            Create account
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-6 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block text-sm font-medium ${
                pathname === link.href ? "text-[#1A237E]" : "text-black"
              }`}
              onClick={() => setMenuOpen(false)} // close menu on click
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col gap-3 pt-4 border-t">
            <Link
              href="/admin"
              className="px-4 py-2 border rounded-full text-sm font-medium text-black hover:bg-gray-100 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Admin Panel
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium text-center hover:bg-blue-700"
              onClick={() => setMenuOpen(false)}
            >
              Create account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
