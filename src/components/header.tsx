'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 

  const pathname = usePathname(); 

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const adminFlag = localStorage.getItem('isAdmin');
    if (adminFlag === 'true') setIsAdmin(true);
  }, []);

  const navItems = ['Home', 'Products', 'Contact', 'Dashboard'];

  return (
    <header
      className={`fixed  top-0 left-0 z-50 w-full text-slate-800 transition-all duration-300 ${
        isSticky
          ? 'bg-[#fff7f7]/90 backdrop-blur-md shadow-md border-b border-[#f1dada]'
          : 'bg-[#fff4f4] border-b border-[#f1dada]'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          href="/"
          className="font-bold flex flex-col leading-[30px] text-center tracking-wide text-red-700 hover:scale-105 transition-transform duration-300"
        >
          <Image
            src="/images/logo.png"
            alt="3S Corporation Logo"
            width={1200}
            height={1200}
            className="object-contain w-[110px] h-auto"
            priority
          />
        </Link>

        <nav className="hidden space-x-8 md:flex">
          {navItems
            .filter((item) => item !== 'Dashboard' || isAdmin)
            .map((item) => {
              const path =
                item === 'Home'
                  ? '/'
                  : item === 'Products'
                    ? '/#product'
                    : `/${item.toLowerCase()}`;

              const isActive =
                (item === 'Home' && pathname === '/') ||
                (item === 'Contact' && pathname === '/contact') ||
                (item === 'Dashboard' && pathname === '/dashboard');

              return (
                <Link
                  key={item}
                  href={path}
                  scroll={true}
                  className={`relative font-medium text-xl transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-red-600 after:w-full'
                      : 'text-gray-700 hover:text-red-600 after:w-0 hover:after:w-full'
                  }`}
                >
                  {item}
                </Link>
              );
            })}
        </nav>
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 md:hidden transition"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>

        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          />
        )}

        <div
          className={`fixed top-0 right-0 z-50 h-full w-3/4 max-w-[300px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Link
              href="/"
              className="font-bold flex flex-col leading-[30px] text-center tracking-wide text-red-700 hover:scale-105 transition-transform duration-300"
            >
              <Image
                src="/images/logo.png"
                alt="3S Corporation Logo"
                width={1200}
                height={1200}
                className="object-contain w-[110px] h-auto"
                priority
              />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

       
          <nav className="flex flex-col space-y-6 p-6 text-gray-700 md:hidden">
            {navItems
              .filter((item) => item !== 'Dashboard' || isAdmin)
              .map((item) => {
                const path =
                  item === 'Home'
                    ? '/'
                    : item === 'Products'
                      ? '/#product'
                      : `/${item.toLowerCase()}`;

                const isActive =
                  (item === 'Home' && pathname === '/') ||
                  (item === 'Contact' && pathname === '/contact') ||
                  (item === 'Dashboard' && pathname === '/dashboard');

                return (
                  <Link
                    key={item}
                    href={path}
                    scroll={true}
                    onClick={() => setMenuOpen(false)}
                    className={`relative font-semibold text-2xl transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 ${
                      isActive
                        ? 'text-red-600 after:w-full'
                        : 'text-gray-700 hover:text-red-600 after:w-0 hover:after:w-full'
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
          </nav>
        </div>
      </div>
    </header>
  );
}
