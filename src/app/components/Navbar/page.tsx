// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: "HOME", href: "/" },
    { name: "ALL DOCTORS", href: "/doctors" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Prescripto Logo" width={32} height={32} />
          <span className="text-2xl font-semibold text-[#1A237E]">Prescripto</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative pb-1 text-sm font-medium transition ${
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

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="px-4 py-1 border rounded-full text-sm font-medium text-black hover:bg-gray-100"
          >
            Admin Panel
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700"
          >
            Create account
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
