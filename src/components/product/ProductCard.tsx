'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProductCard({ product }: { product: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        y: -5,
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center justify-between"
    >
      <div className="w-full flex flex-col items-center">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-md object-cover h-[150px] w-full"
        />
        <h4
          className="mt-3 text-base font-medium text-gray-800 text-center line-clamp-2 h-[48px]"
          title={product.name}
        >
          {product.name}
        </h4>
        <p className="text-red-600 font-bold text-base mt-1">Rs {product.price.toLocaleString()}</p>
        <span className="text-sm text-gray-500 mt-1">⭐ {product.rating} / 5</span>
      </div>

      <button className="mt-4 w-full cursor-pointer rounded-md bg-red-600 text-white py-2 text-sm font-semibold hover:bg-red-700 transition  ">
        Add to Cart
      </button>
    </motion.div>
  );
}
