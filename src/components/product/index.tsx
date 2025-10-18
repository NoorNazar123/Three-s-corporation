'use client';

import { useState, useMemo } from 'react';
import StoreSidebar from './StoreSidebar';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

// export const productsData = [
//   {
//     id: 1,
//     name: 'Dell Laptop Battery 65Wh',
//     category: 'Batteries',
//     price: 9500,
//     image: '/images/main3.webp',
//     rating: 4.5,
//   },
//   {
//     id: 2,
//     name: 'HP Adapter 45W Type-C',
//     category: 'Chargers',
//     price: 7500,
//     image: '/images/main3.webp',
//     rating: 4.3,
//   },
//   {
//     id: 3,
//     name: 'Lenovo Battery 48Wh',
//     category: 'Batteries',
//     price: 8700,
//     image: '/images/main3.webp',
//     rating: 4.2,
//   },
//   {
//     id: 4,
//     name: 'Cooling Pad Pro RGB',
//     category: 'Accessories',
//     price: 4500,
//     image: '/images/main3.webp',
//     rating: 4.7,
//   },
//   {
//     id: 5,
//     name: 'USB-C Multiport Hub',
//     category: 'Accessories',
//     price: 5600,
//     image: '/images/main3.webp',
//     rating: 4.6,
//   },
//   {
//     id: 6,
//     name: 'Acer Charger 65W',
//     category: 'Chargers',
//     price: 6800,
//     image: '/images/main3.webp',
//     rating: 4.4,
//   },
//   {
//     id: 7,
//     name: 'Asus Laptop Battery 56Wh',
//     category: 'Batteries',
//     price: 8800,
//     image: '/images/main3.webp',
//     rating: 4.5,
//   },
//   {
//     id: 8,
//     name: 'MacBook Pro Charger 60W Magsafe',
//     category: 'Chargers',
//     price: 11000,
//     image: '/images/main3.webp',
//     rating: 4.8,
//   },
//   {
//     id: 9,
//     name: 'Laptop Stand Adjustable Aluminum',
//     category: 'Accessories',
//     price: 3900,
//     image: '/images/main3.webp',
//     rating: 4.4,
//   },
//   {
//     id: 10,
//     name: 'HP Battery 41Wh',
//     category: 'Batteries',
//     price: 7600,
//     image: '/images/main3.webp',
//     rating: 4.1,
//   },
//   {
//     id: 11,
//     name: 'USB-C Fast Charger 65W GaN',
//     category: 'Chargers',
//     price: 9200,
//     image: '/images/main3.webp',
//     rating: 4.7,
//   },
//   {
//     id: 12,
//     name: 'Wireless Mouse Ergonomic Pro',
//     category: 'Accessories',
//     price: 2500,
//     image: '/images/main3.webp',
//     rating: 4.3,
//   },
//   {
//     id: 13,
//     name: 'Dell Adapter 90W Slim',
//     category: 'Chargers',
//     price: 8500,
//     image: '/images/main3.webp',
//     rating: 4.6,
//   },
//   {
//     id: 14,
//     name: 'Lenovo Cooling Pad Dual Fan',
//     category: 'Accessories',
//     price: 4700,
//     image: '/images/main3.webp',
//     rating: 4.5,
//   },
//   {
//     id: 15,
//     name: 'Acer Battery 52Wh',
//     category: 'Batteries',
//     price: 8200,
//     image: '/images/main3.webp',
//     rating: 4.2,
//   },
//   {
//     id: 16,
//     name: 'Logitech Wireless Keyboard Combo',
//     category: 'Accessories',
//     price: 7200,
//     image: '/images/main3.webp',
//     rating: 4.8,
//   },
//   {
//     id: 17,
//     name: 'HP Charger 65W Type-C',
//     category: 'Chargers',
//     price: 7700,
//     image: '/images/main3.webp',
//     rating: 4.5,
//   },
//   {
//     id: 18,
//     name: 'MSI Gaming Battery 62Wh',
//     category: 'Batteries',
//     price: 9700,
//     image: '/images/main3.webp',
//     rating: 4.6,
//   },
//   {
//     id: 19,
//     name: 'Laptop Cooling Pad X5 RGB',
//     category: 'Accessories',
//     price: 5200,
//     image: '/images/main3.webp',
//     rating: 4.7,
//   },
//   {
//     id: 20,
//     name: 'Universal Charger 90W Smart Tip',
//     category: 'Chargers',
//     price: 9800,
//     image: '/images/main3.webp',
//     rating: 4.5,
//   },
// ];

export const productsData = [
  {
    id: 1,
    name: 'Dell Laptop Battery 65Wh',
    category: 'Batteries',
    price: 9500,
    image: '/images/main3.webp',
    images: ['/images/main3.webp', '/images/main3.webp', '/images/main3.webp'],
    description: 'Reliable 65Wh battery compatible with Dell laptops for long-lasting performance.',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'HP Adapter 45W Type-C',
    category: 'Chargers',
    price: 7500,
    image: '/images/main3.webp',
    images: ['/images/main3.webp', '/images/main3.webp', '/images/main3.webp'],
    description: 'Compact 45W Type-C adapter suitable for HP laptops with fast charging support.',
    rating: 4.3,
  },
  {
    id: 3,
    name: 'Lenovo Battery 48Wh',
    category: 'Batteries',
    price: 8700,
    image: '/images/main3.webp',
    images: ['/images/main3.webp', '/images/main3.webp', '/images/main3.webp'],
    description: 'Original 48Wh Lenovo battery providing stable backup and performance.',
    rating: 4.2,
  },
  {
    id: 4,
    name: 'Cooling Pad Pro RGB',
    category: 'Accessories',
    price: 4500,
    image: '/images/main3.webp',
    images: ['/images/main3.webp', '/images/main3.webp', '/images/main3.webp'],
    description: 'RGB cooling pad with dual fans to keep your laptop cool during heavy use.',
    rating: 4.7,
  },
  {
    id: 5,
    name: 'USB-C Multiport Hub',
    category: 'Accessories',
    price: 5600,
    image: '/images/main3.webp',
    images: ['/images/main3.webp', '/images/main3.webp', '/images/main3.webp'],
    description: 'Expand your laptop’s connectivity with this high-speed USB-C multiport hub.',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Acer Charger 65W',
    category: 'Chargers',
    price: 6800,
    image: '/images/main3.webp',
    images: ['/images/main3.webp', '/images/main3.webp', '/images/main3.webp'],
    description: '65W Acer original charger for stable power delivery and battery health.',
    rating: 4.4,
  },
  {
    id: 7,
    name: 'Asus Laptop Battery 56Wh',
    category: 'Batteries',
    price: 8800,
    image: '/images/main3.webp',
    images: ['/images/main3.webp', '/images/main3.webp', '/images/main3.webp'],
    description: 'High-capacity Asus 56Wh battery for extended runtime and durability.',
    rating: 4.5,
  },
  {
    id: 8,
    name: 'MacBook Pro Charger 60W Magsafe',
    category: 'Chargers',
    price: 11000,
    image: '/images/main3.webp',
    images: ['/images/main3.webp', '/images/main3.webp', '/images/main3.webp'],
    description: 'Genuine Apple MagSafe 60W charger with magnetic connector for MacBook Pro.',
    rating: 4.8,
  },
  {
    id: 9,
    name: 'Laptop Stand Adjustable Aluminum',
    category: 'Accessories',
    price: 3900,
    image: '/images/main3.webp',
    images: ['/images/main3.webp', '/images/main3.webp', '/images/main3.webp'],
    description: 'Ergonomic and foldable aluminum laptop stand with height adjustability.',
    rating: 4.4,
  },
  {
    id: 10,
    name: 'HP Battery 41Wh',
    category: 'Batteries',
    price: 7600,
    image: '/images/main3.webp',
    images: ['/images/main3.webp', '/images/main3.webp', '/images/main3.webp'],
    description: 'Durable 41Wh battery built for HP laptops for extended performance.',
    rating: 4.1,
  },
];

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Filter logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => (category === 'All' ? true : p.category === category))
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => p.price <= maxPrice);
  }, [search, category, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="container mx-auto mt-20 px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <StoreSidebar selected={category} setSelected={setCategory} />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 space-y-6">
          {/* Search + Price Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/2 rounded-md  px-4 py-2 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
            />
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-700">Max Price:</label>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-red-600 cursor-pointer"
              />
              <span className="text-sm font-semibold text-gray-800">Rs {maxPrice}</span>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className="text-gray-500 text-center col-span-full py-10">No products found 😔</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </section>
  );
}
