"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Nunito } from "next/font/google";


const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface User {
  _id: string;
  username: string;
  email: string;
}

export const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user once on mount
  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setIsLoggedIn(true);
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user)); // keep latest user
        } else {
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem("user");
        }
      })
      .catch((err) => console.error("Failed to fetch user:", err))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  // ✅ Listen for login events from anywhere
  useEffect(() => {
    const handleUserUpdate = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("userUpdated")); // notify all components
      setDropdownOpen(false);
      window.location.href = "/signIn";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const links = [
    { name: "HOME", href: "/home" },
    { name: "ALL DOCTORS", href: "/doctors" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <nav
      className={`w-full border-b bg-white sticky top-0 z-50 ${nunito.className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/next.svg" alt="Prescripto Logo" width={32} height={32} />
          <span className="text-2xl font-semibold text-[#1A237E]">
            Prescripto
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative pb-1 text-lg font-bold transition ${
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

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4 relative">
          <Link
            href="/admin"
            className="px-4 py-1 border rounded-full text-sm font-medium text-black hover:bg-gray-100"
          >
            Admin Panel
          </Link>

          {loading ? null : !isLoggedIn ? (
            <Link
              href="/signUp"
              className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700"
            >
              Create account
            </Link>
          ) : (
            <div
              className="flex items-center gap-2 relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="text-sm font-medium text-gray-700">
                Hi, {user?.username}
              </span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200">
                <User className="text-blue-600" size={20} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-40 w-48 bg-white shadow-lg rounded-lg border py-2">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/appointment"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Appointments
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};
