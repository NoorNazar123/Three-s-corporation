"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const Section: React.FC = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    category: "",
    rating: "",
    image: "",
    images: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { id, name, category, rating, image, images, price, description } = product;
    if (!id || !name || !category || !rating || !image || !images || !price || !description) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const formattedProduct = {
        ...product,
        rating: parseFloat(product.rating),
        price: Number(product.price),
        images: product.images.split(",").map((img) => img.trim()), // convert comma-separated to array
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "products"), formattedProduct);
      alert("✅ Product added successfully!");
      setProduct({
        id: "",
        name: "",
        category: "",
        rating: "",
        image: "",
        images: "",
        price: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit}>
        {[
          { label: "Product ID", name: "id" },
          { label: "Product Name", name: "name" },
          { label: "Category", name: "category" },
          { label: "Rating (e.g., 4.5)", name: "rating" },
          { label: "Main Image URL", name: "image" },
          {
            label: "Other Images (comma separated URLs)",
            name: "images",
          },
          { label: "Price", name: "price" },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={product[field.name as keyof typeof product]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`border border-gray-300 py-2 px-6 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-green-600 hover:text-white"
            }`}
          >
            {loading ? "Saving..." : "Save Product"}
          </button>

          <button
            type="button"
            onClick={() =>
              setProduct({
                id: "",
                name: "",
                category: "",
                rating: "",
                image: "",
                images: "",
                price: "",
                description: "",
              })
            }
            className="border border-gray-300 hover:bg-red-600 hover:text-white py-2 px-6 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Section;
