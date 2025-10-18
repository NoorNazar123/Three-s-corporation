"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Sticky navbar effect
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed  top-0 left-0 z-50 w-full text-slate-800 transition-all duration-300 ${
        isSticky ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold flex flex-col leading-[30px] text-center tracking-wide text-red-700 hover:scale-105 transition-transform duration-300"
        >
          <Image
            src="/images/logo.png" // replace with your actual logo path
            alt="3S Corporation Logo"
            width={1200} // adjust as needed
            height={1200}
            className="object-contain w-[110px] h-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden space-x-8 md:flex">
          {["Home", "Products", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${
                item.toLowerCase() === "home" ? "" : item.toLowerCase()
              }`}
              className="relative text-gray-700 font-medium text-xl  transition-all duration-300 hover:text-red-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 md:hidden transition"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>

        {/* Overlay */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          />
        )}

        {/* Side Drawer */}
        <div
          className={`fixed top-0 right-0 z-50 h-full w-3/4 max-w-[300px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <span className="text-lg font-semibold text-gray-800">
              3S Corporation
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 p-6 text-gray-700">
            {["Home", "Products", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${
                  item.toLowerCase() === "home" ? "" : item.toLowerCase()
                }`}
                className=" text-black font-semibold text-2xl transition-all duration-300 hover:text-red-600 hover:translate-x-1"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
