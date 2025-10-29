"use client";
import React, { useState, useEffect } from "react";
import Section from "./Section";

const Dashboard = () => {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin");
    if (adminFlag === "true") setAuthorized(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
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

  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className=" p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md text-center">
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

  // ✅ Show dashboard when authorized
  return (
    <div className="min-h-screen">
      <Section />
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

export default Dashboard;
