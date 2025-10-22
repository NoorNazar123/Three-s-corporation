"use client"

import React from 'react'
import { motion } from 'framer-motion';

const Section = () => {
  return (
     <section className="overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row min-h-[80vh] gap-10">
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full lg:w-1/2 mt-18"
        >
          <h1 className="mb-5 text-3xl md:text-4xl font-extrabold leading-tight text-slate-800 lg:text-[42px]">
            Let’s <span className="text-red-600">Connect</span> and Power Your Devices
          </h1>

          <p className="mb-8 max-w-[500px] text-gray-600 text-base">
            Have a question, need a quote, or want help choosing the right product?  
            Our support team is ready to assist you with personalized guidance and quick responses.
          </p>

          <motion.div
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <a
              href="tel:+923001234567"
              className="flex items-center justify-center gap-2 rounded-md bg-red-600 px-6 py-3 text-white font-semibold text-sm md:text-base shadow-md transition hover:bg-red-700"
            >
              📞 Call Now
            </a>
            <a
              href="mailto:support@3scorporation.com"
              className="flex items-center justify-center gap-2 rounded-md border border-red-600 px-6 py-3 text-red-600 font-semibold text-sm md:text-base transition hover:bg-red-600 hover:text-white shadow-sm"
            >
              ✉️ Send Email
            </a>
          </motion.div>
        </motion.div>

        {/* Right Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="w-full lg:w-1/2"
        >
          <form className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Send Us a Message ✉️
            </h2>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full  rounded-md p-3  text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-md p-3  text-gray-700 border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Message</label>
              <textarea
                rows={4}
                placeholder="How can we help you?"
                className="w-full rounded-md p-3  text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Section
