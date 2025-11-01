'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center  text-center px-6 py-32">
      <h1 className="text-7xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Sorry, the page you’re looking for doesn’t exist.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
      >
        Go back home
      </Link>
    </main>
  );
}
