'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderModal from './ordermodal';
import { productsData } from '@/components/product';

export interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  rating: number;
  description?: string;
}

const ProductPage: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const id = Number(params.slug);
  const product = productsData.find((pro) => pro.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center  bg-[#0c1425]">
        Product not found.
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [, , , variant] = activeImage.split('/');
  const watchvariant = variant ? variant.split('.')[0] : product.name;

  const actualPrice = Math.floor(product.price * 1.15);
  const discountedPrice = product.price;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div className="text-gray-900 min-h-screen">
      {/* Product Card Container - 50/50 split */}
      <div className="relative z-10 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Image Section (50%) */}
        <div className="lg:w-1/2 w-full flex flex-col items-center justify-center px-8">
          <div
            className={`w-full max-w-[500px] h-[300px] rounded-xl overflow-hidden flex justify-center items-center relative border border-red-600 ${
              isZoomed ? 'cursor-crosshair' : ''
            }`}
            onMouseMove={isZoomed ? handleMouseMove : undefined}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={activeImage}
              alt={product.name}
              className={`w-full h-full object-contain transition-transform duration-300 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={isZoomed ? { transformOrigin: `${position.x}% ${position.y}%` } : undefined}
            />
          </div>

          {/* Thumbnail Images */}
          <div className="min-w-[400px] py-2 flex mt-6 space-x-4 overflow-auto max-w-full justify-center">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Variant ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                  activeImage === image ? 'border-red-500 scale-105' : 'border-gray-800'
                }`}
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details (50%) */}
        <div className="lg:w-1/2 w-full p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-6 leading-relaxed">
            {product.description ||
              'This product is crafted with premium materials and advanced technology, offering the perfect blend of performance and durability.'}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl text-red-500 line-through">{actualPrice} Rs</span>
            <span className="text-3xl">|</span>
            <span className="text-2xl font-semibold text-green-600">{discountedPrice} Rs</span>
          </div>

          <p className="text-lg mb-4">
            Variant: <span className="text-gray-600 font-semibold">{watchvariant}</span>
          </p>

          <div className="text-lg mb-8">Free delivery all over Pakistan 🚚</div>

          <button
            className="text-white bg-red-600 font-semibold hover:text-white py-4 px-8 rounded-lg text-xl w-full max-w-xs
             transition-all duration-300 ease-in-out 
             hover:bg-red-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        variant={watchvariant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // @ts-ignore
        productId={product.id}
      />
    </div>
  );
};

export default ProductPage;
