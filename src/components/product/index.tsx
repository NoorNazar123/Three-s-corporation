'use client';

import { useState, useMemo, useEffect } from 'react';
import StoreSidebar from './StoreSidebar';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
  additionalInfo?: {
    title?: string;
    detailsDescription?: string;
    brand?: string;
    material?: string;
    colorOptions?: string[];
    warrantyPeriod?: string;
    returnPolicy?: string;
  } | null;
}

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));

      const productsList: Product[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;

        const cleanImages = Array.isArray(data.images)
          ? data.images.map((img: string) =>
              typeof img === 'string' ? img.replace(/^'+|'+$/g, '').trim() : ''
            )
          : data.images
          ? [data.images.replace(/^'+|'+$/g, '').trim()]
          : [];

        return {
          id: data.id ?? '',
          name: data.name ?? 'Unnamed Product',
          category: data.category ?? 'Uncategorized',
          rating: data.rating ?? 0,
          image:
            typeof data.image === 'string'
              ? data.image.replace(/^'+|'+$/g, '').trim()
              : '',
          images: cleanImages,
          price: data.price ?? 0,
          description: data.description ?? 'No description available.',
          createdAt:
            data.createdAt && data.createdAt.toDate
              ? data.createdAt.toDate().toISOString()
              : '',
          additionalInfo: data.additionalInfo
            ? {
                title: data.additionalInfo.title ?? '',
                detailsDescription: data.additionalInfo.detailsDescription ?? '',
                brand: data.additionalInfo.brand ?? '',
                material: data.additionalInfo.material ?? '',
                colorOptions: Array.isArray(data.additionalInfo.colorOptions)
                  ? data.additionalInfo.colorOptions
                  : [],
                warrantyPeriod: data.additionalInfo.warrantyPeriod ?? '',
                returnPolicy: data.additionalInfo.returnPolicy ?? '',
              }
            : null,
          docId: doc.id,
        };
      });

      // ✅ move this OUTSIDE the map
      setProducts(productsList);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      alert('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const itemsPerPage = 8;

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) =>
        category === 'All'
          ? true
          : p.category.replace(/\s+/g, '').toLowerCase() ===
            category.replace(/\s+/g, '').toLowerCase()
      )
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => p.price <= maxPrice);
  }, [search, category, maxPrice, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="product" className="container mx-auto mt-20 px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <StoreSidebar selected={category} setSelected={setCategory} />
        </div>

        <div className="w-full lg:w-3/4 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/2 rounded-md px-4 py-2 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
            />
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-700">Max Price:</label>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-red-600 cursor-pointer"
              />
              <span className="text-sm font-semibold text-gray-800">
                Rs {maxPrice}
              </span>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading products...</p>
          ) : paginatedProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id || product.docId} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center col-span-full py-10">
              No products found 😔
            </p>
          )}

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
