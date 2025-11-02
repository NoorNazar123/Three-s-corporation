'use client';

import React, { useState } from 'react';
import OrderModal from './ordermodal';

export interface AdditionalInfo {
  title?: string;
  detailsDescription?: string;
  brand?: string;
  material?: string;
  colorOptions?: string[];
  warrantyPeriod?: string;
  returnPolicy?: string;
}

export interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  discount?: number;
  image: string;
  images: string[];
  rating: number;
  description?: string;
  additionalInfo?: AdditionalInfo | null;
}

interface SectionProps {
  product: Product;
}

const Section: React.FC<SectionProps> = ({ product }) => {
  const [activeImage, setActiveImage] = useState<string>(product.images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [, , , variant] = activeImage?.split('/') ?? [];
  const watchvariant = variant ? variant.split('.')[0] : product.name;

  const actualPrice = Math.floor(product.price * 1.15);
  const discountedPrice = product.discount ?? product.price;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div className="text-gray-900 min-h-screen overflow-x-hidden">
      {/* Product Card Container */}
      <div className="relative z-10 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Images */}
        <div className="lg:w-1/2 w-full flex flex-col items-center px-6 sm:px-8">
          <div
            className={`w-full max-w-[500px] h-[300px] sm:h-[400px] rounded-xl overflow-hidden flex justify-center items-center relative border border-red-600 ${
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

          {/* Thumbnails */}
          <div className="w-full py-3 flex mt-6 space-x-3 overflow-x-auto justify-start sm:justify-center scrollbar-hide">
            {product.images.map((image, index) => (
              <img
                key={`${product.id}-${index}`}
                src={image}
                alt={`Variant ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 flex-shrink-0 ${
                  activeImage === image ? 'border-red-500 scale-105' : 'border-gray-800'
                }`}
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:w-1/2 w-full px-6 sm:px-8 mt-8 lg:mt-0 flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-base sm:text-lg mb-6 leading-relaxed text-gray-700">
            {product.description ||
              'This product is crafted with premium materials and advanced technology, offering the perfect blend of performance and durability.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xl sm:text-2xl text-red-500 line-through">{actualPrice} Rs</span>
            <span className="text-2xl">|</span>
            <span className="text-xl sm:text-2xl font-semibold text-green-600">
              {discountedPrice} Rs
            </span>
          </div>

          <p className="text-lg mb-4">
            Variant: <span className="text-gray-600 font-semibold">{watchvariant}</span>
          </p>

          <div className="text-lg mb-8">Free delivery all over Pakistan 🚚</div>

          <button
            className="text-white bg-red-600 font-semibold py-4 px-8 rounded-lg text-xl w-full max-w-xs transition-all duration-300 ease-in-out hover:bg-red-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Order Now
          </button>
        </div>
      </div>

      {/* 🧾 Additional Info Section */}
      {product.additionalInfo && (
        <div className="mt-16 px-6 sm:px-8 lg:px-16 pb-20">
          <h2 className="text-2xl font-bold text-red-600 mb-6 border-b pb-2">
            Additional Information
          </h2>

          {product.additionalInfo.title && (
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {product.additionalInfo.title}
            </h3>
          )}

          {product.additionalInfo.detailsDescription && (
            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.additionalInfo.detailsDescription}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.additionalInfo.brand && (
              <div>
                <h4 className="font-semibold text-gray-800">Brand</h4>
                <p className="text-gray-600">{product.additionalInfo.brand}</p>
              </div>
            )}

            {product.additionalInfo.material && (
              <div>
                <h4 className="font-semibold text-gray-800">Material</h4>
                <p className="text-gray-600">{product.additionalInfo.material}</p>
              </div>
            )}

            {Array.isArray(product.additionalInfo.colorOptions) &&
              product.additionalInfo.colorOptions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800">Available Colors</h4>
                  <p className="text-gray-600">{product.additionalInfo.colorOptions.join(', ')}</p>
                </div>
              )}

            {product.additionalInfo.warrantyPeriod && (
              <div>
                <h4 className="font-semibold text-gray-800">Warranty</h4>
                <p className="text-gray-600">{product.additionalInfo.warrantyPeriod}</p>
              </div>
            )}

            {product.additionalInfo.returnPolicy && (
              <div>
                <h4 className="font-semibold text-gray-800">Return Policy</h4>
                <p className="text-gray-600">{product.additionalInfo.returnPolicy}</p>
              </div>
            )}
          </div>
        </div>
      )}

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

export default Section;
