'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61568556226122",
  },
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-azam-ahmad-526a0a390/" },
  {
    icon: "/images/tiktok-icon.svg",
    href: "https://www.tiktok.com/@3s.cop.laptops.an?_t=ZS-90yQN8zl7WJ&_r=1",
  },
];

const message = encodeURIComponent("Hi! I found your website and wanted to connect with the developer — are you available to chat?");

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-gray-100 to-blue-100 text-gray-700 py-10 mt-20 border-t border-gray-200">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div className="flex flex-col items-center md:items-start">
          <Link
            href="/"
            className="font-bold w-[200px] h-40 -mt-8 flex flex-col leading-[30px] tracking-wide text-red-700 hover:scale-105 transition-transform duration-300"
          >
            <Image
              src="/images/logo.png" // replace with your actual logo path
              alt="3S Corporation Logo"
              width={1000} // adjust as needed
              height={1000}
              className="object-contain"
              priority
            />
          </Link>
          {/* <p className="mt-4 text-sm text-gray-600 max-w-xs text-center md:text-left">
            Powering your devices with high-quality laptop batteries and
            accessories you can trust. Reliable, affordable, and built to last.
          </p> */}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Contact Us</h4>

          <div className="flex items-center gap-2 mb-2">
            <Phone className="text-red-600 w-5 h-5" />
            <a href="tel:+923453286167" className="hover:text-red-600 transition text-sm">
              +92 3453286167
            </a>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Mail className="text-red-600 w-5 h-5" />
            <a
              href="mailto:3scorpor@gmail.com"
              className="hover:text-red-600 transition text-sm"
            >
              3scorpor@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-red-600 w-5 h-5" />
            <a
              href="https://goo.gl/maps/abc123" // replace with actual Google Maps link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition text-sm"
            >
              Plot #15, Industrial Area, Karachi, Pakistan
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h4>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href }, i) => (
        <Link
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full border border-gray-300 hover:bg-red-600 hover:text-white transition-all"
        >
          {typeof Icon === "string" ? (
            <Image
              src={Icon}
              alt="TikTok"
              width={20}
              height={20}
              className="object-contain"
            />
          ) : (
            <Icon className="w-5 h-5" />
          )}
        </Link>
      ))}
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-200 pt-4">
        © {new Date().getFullYear()} 3S Corporation. All rights reserved.
      </div>

  {/* Developer Credit */}
{/* Developer Credit */}
<div className="text-center text-sm text-gray-500 mt-4">
  Designed & Developed by{" "}
  <a
    href={`https://wa.me/923178813001?text=${message}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-red-600 hover:underline"
  >
    Muhammad Noor e Nazar
  </a>{" "}
  —{" "}
  <a href="mailto:noorenazar.prog@gmail.com" className="hover:underline">
    noorenazar.prog@gmail.com
  </a>
</div>

    </footer>
  );
}
