"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Section: React.FC = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    category: "",
    rating: "",
    price: "",
    description: "",
    image: "", // main image URL
    images: "", // comma-separated URLs
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { id, name, category, rating, price, description, image, images } = product;

    if (!id || !name || !category || !rating || !price || !description || !image) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const formattedProduct = {
        id: id.trim(),
        name: name.trim(),
        category: category.trim(),
        rating: parseFloat(rating),
        price: Number(price),
        description: description.trim(),
        image: image.trim(),
        images: images
          ? images.split(",").map((url) => url.trim()).filter(Boolean)
          : [image.trim()],
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "products"), formattedProduct);
      alert("✅ Product added successfully!");

      // Reset form
      setProduct({
        id: "",
        name: "",
        category: "",
        rating: "",
        price: "",
        description: "",
        image: "",
        images: "",
      });
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("Failed to add product. Try again.");
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
          { label: "Price", name: "price" },
          { label: "Main Image URL", name: "image" },
          { label: "Additional Images (comma separated URLs)", name: "images" },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={product[field.name as keyof typeof product]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required={field.name !== "images"} // optional for images
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
                price: "",
                description: "",
                image: "",
                images: "",
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
