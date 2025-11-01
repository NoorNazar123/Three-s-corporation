'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Products from '@/components/product';

const images = ['/images/3s.webp', '/images/img1.jpeg', '/images/img3.jpeg'];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="overflow-hidden">
        <div className="container mx-auto px-6 flex flex-wrap items-center">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full lg:w-1/2 mb-12 lg:mb-0 md:-mt-8"
          >
            <h1 className="mb-5 text-3xl md:text-4xl font-extrabold leading-tight text-slate-800 lg:text-[42px]">
              Power Up Your Devices with{' '}
              <span className="text-red-600">Premium Laptop Batteries</span> & Accessories
            </h1>

            <p className="mb-8 max-w-[500px] text-gray-600 text-base">
              Discover high-performance batteries, chargers, and accessories built for durability,
              reliability, and your device’s best life. Trusted by thousands of tech users
              nationwide.
            </p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mb-5 text-base font-medium text-slate-700"
            >
              ⚡ Power up your laptop — call now or email us for the perfect match 🎉🚀
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+923218945376"
                className="flex items-center justify-center gap-2 rounded-md bg-red-600 px-6 py-3 text-white font-semibold text-xs md:text-base shadow-md transition hover:bg-red-700"
              >
                Talk to a Power Expert
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:3scorpor@gmail.com"
                className="flex items-center justify-center gap-2 rounded-md border border-red-600 px-6 py-3 text-red-600 font-semibold text-xs md:text-base transition hover:bg-red-600 hover:text-white shadow-sm"
              >
                Get the Best Quote
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image Slider Section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="w-full px-4 lg:w-1/2 relative h-[400px] flex items-center justify-center"
          >
            <AnimatePresence>
              <motion.div
                key={images[current]}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={images[current]}
                  alt={`Slide ${current + 1}`}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-200/30 via-yellow-100/20 to-transparent rounded-2xl" />
              </motion.div>
            </AnimatePresence>

            {/* Optional Dots Indicator */}
            <div className="absolute bottom-4 flex gap-2 justify-center w-full">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    current === index ? 'bg-red-600 scale-110' : 'bg-yellow-400 opacity-60'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Products />
    </>
  );
}
