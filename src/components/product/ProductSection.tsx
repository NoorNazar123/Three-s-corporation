"use client"

import { db } from "@/lib/firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";

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
      const querySnapshot = await getDocs(collection(db, "products"));

      const productsList: Product[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;

        return {
          id: data.id || "",
          name: data.name || "",
          category: data.category || "",
          rating: data.rating || 0,
          image: data.image || "",
          images: data.images || [],
          price: data.price || 0,
          description: data.description || "",
          createdAt: data.createdAt || "",
          docId: doc.id, // Firestore document ID
        };
      });

      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("❌ Failed to load products. Try again later.");
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
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-1">
                Category: {product.category}
              </p>
              <p className="text-gray-600 mb-2">{product.description}</p>
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
