"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Section: React.FC = () => {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");
  const [product, setProduct] = useState({
    id: "",
    name: "",
    category: "",
    rating: "",
    price: "",
    discount: "",
    description: "",
    image: "",
    images: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin");
    if (adminFlag === "true") setAuthorized(true);
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (input === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      localStorage.setItem("isAdmin", "true");
      setAuthorized(true);
    } else {
      alert("Wrong admin key. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setAuthorized(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { id, name, category, rating, price, discount, description, image, images } = product;

    if (!id || !name || !category || !rating || !price || !description || !image || !discount) {
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
        discount: Number(discount),
        description: description.trim(),
        image: image.trim(),
        images: images
          ? images.split(",").map((url) => url.trim()).filter(Boolean)
          : [image.trim()],
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "products"), formattedProduct);
      alert("✅ Product added successfully!");
      setProduct({
        id: "",
        name: "",
        category: "",
        rating: "",
        price: "",
        discount: "",
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

  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-[80%]">
        <div className="p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔒 Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter admin key"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none text-gray-900"
            />
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-red-300"
            >
              Login
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-5">Authorized access only 🚫</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Product ID", name: "id" },
              { label: "Product Name", name: "name" },
              { label: "Category", name: "category" },
              { label: "Rating", name: "rating" },
              { label: "Price", name: "price" },
              { label: "Discount", name: "discount" },
              { label: "Main Image URL", name: "image" },
              { label: "Additional Images (comma separated URLs)", name: "images" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block mb-1 font-medium">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={product[field.name as keyof typeof product]}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                  required={field.name !== "images"}
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full rounded-md p-3 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
              required
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`border border-gray-300 py-2 px-6 rounded ${
                loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-green-600 hover:text-white"
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
                  discount: "",
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

      <div className="flex justify-end p-6">
        <button
          onClick={handleLogout}
          className="border border-red-500 hover:bg-red-500 bg-white text-red-500 hover:text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Section;
