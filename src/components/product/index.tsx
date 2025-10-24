'use client';

import { useState, useMemo } from 'react';
import StoreSidebar from './StoreSidebar';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { productsData } from '@/lib/peoductData';

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
    <section id='product' className="container mx-auto mt-20 px-6">
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
          <div  className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
