import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppChat from '@/components/WhatsAppChat';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: "Home | 3S Corporation", 
    template: "%s | 3S Corporation",
  },
  description:
    "Shop premium laptop batteries, chargers, and accessories at 3S Corporation. Trusted quality, fast delivery, and top-rated service in Pakistan.",
  openGraph: {
    title: "3S Corporation",
    description:
      "Reliable laptop batteries, chargers, and accessories available with free delivery across Pakistan.",
    url: "https://3scorporation.pk",
    siteName: "3S Corporation",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3S Corporation",
    description:
      "Premium laptop accessories — batteries, chargers, and more for every brand.",
  },
  icons: {
    icon: "/icon.png",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-white via-gray-100 to-blue-100



 w-full`}
      >
        <div className="max-w-7xl mx-auto ">
          <Header />
          <main className="pt-40">{children} <WhatsAppChat /></main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
