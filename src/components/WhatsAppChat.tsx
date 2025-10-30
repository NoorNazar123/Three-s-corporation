'use client';

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppChat() {
  const message = encodeURIComponent(`Hi! I'm interested in the product. Can you tell me more about it?`);
  const href = `https://wa.me/923453286167?text=${message}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
    >
      <MessageCircle className="w-6 h-6" />
    </Link>
  );
}
