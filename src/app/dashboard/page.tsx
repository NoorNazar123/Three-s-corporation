"use client";
import React, { useState } from "react";
import Section from "./Section";

const Dashboard = () => {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setAuthorized(true);
    } else {
      alert("Wrong admin key. Please try again.");
    }
  };

  if (!authorized) {
    return (
      <div className=" flex items-center justify-center relative overflow-hidden">
     
        <div className="relative bg-white p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            🔒 Admin Access
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
          <p className="text-gray-500 text-sm mt-5">
            Authorized access only 🚫
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Section />
    </div>
  );
};

export default Dashboard;
