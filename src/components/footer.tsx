"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-gray-100 to-blue-100 text-gray-700 py-10 mt-20 border-t border-gray-200">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div className="flex flex-col items-center md:items-start">
          <Link
            href="/"
            className="font-bold w-[200px] h-[160px] -mt-8 flex flex-col leading-[30px] tracking-wide text-red-700 hover:scale-105 transition-transform duration-300"
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
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Contact Us
          </h4>

          <div className="flex items-center gap-2 mb-2">
            <Phone className="text-red-600 w-5 h-5" />
            <a
              href="tel:+923001234567"
              className="hover:text-red-600 transition text-sm"
            >
              +92 300 1234567
            </a>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Mail className="text-red-600 w-5 h-5" />
            <a
              href="mailto:support@3scorporation.com"
              className="hover:text-red-600 transition text-sm"
            >
              support@3scorporation.com
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
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Follow Us
          </h4>
          <div className="flex items-center gap-4">
            {[
              { icon: Facebook, href: "https://facebook.com" },
              { icon: Instagram, href: "https://instagram.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Youtube, href: "https://youtube.com" },
            ].map(({ icon: Icon, href }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-gray-300 hover:bg-red-600 hover:text-white transition-all"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-200 pt-4">
        © {new Date().getFullYear()} 3S Corporation. All rights reserved.
      </div>
    </footer>
  );
}
