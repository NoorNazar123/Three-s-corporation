'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  images: string[];
  price: number;
  description: string;
  createdAt?: string;
  docId?: string;
}

const ProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));

      const productsList: Product[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;

        const cleanImages = Array.isArray(data.images)
          ? data.images.map((img: string) =>
              typeof img === 'string' ? img.replace(/^'+|'+$/g, '').trim() : ''
            )
          : data.images
            ? [data.images.replace(/^'+|'+$/g, '').trim()]
            : [];

        return {
          id: data.id ?? '',
          name: data.name ?? 'Unnamed Product',
          category: data.category ?? 'Uncategorized',
          rating: data.rating ?? 0,
          image: typeof data.image === 'string' ? data.image.replace(/^'+|'+$/g, '').trim() : '',
          images: cleanImages,
          price: data.price ?? 0,
          description: data.description ?? 'No description available.',
          createdAt: data.createdAt ?? '',
          docId: doc.id,
        };
      });

      setProducts(productsList);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      alert('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Products</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.docId}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Main image */}
              <img
                src={product.image || (product.images[0] ?? '/placeholder.png')}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              {/* Product info */}
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-1">Category: {product.category}</p>
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>

              {/* Extra images */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}

              {/* Price + Rating */}
              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-green-600">
                  Rs {product.price.toLocaleString()}
                </span>
                <span className="text-yellow-500">⭐ {product.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
