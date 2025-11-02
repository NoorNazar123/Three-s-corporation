'use client';

import { useState, useMemo, useEffect } from 'react';
import StoreSidebar from './StoreSidebar';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { collection, DocumentData, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
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
  const [isAdmin, setIsAdmin] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    const saved = localStorage.getItem('isAdmin');
    if (saved === 'true') setIsAdmin(true);
  }, []);

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
          image: typeof data.image === 'string' ? data.image.replace(/^'+|'+$/g, '').trim() : '',
          images: cleanImages,
          price: data.price ?? 0,
          description: data.description ?? 'No description available.',
          createdAt:
            data.createdAt && data.createdAt.toDate ? data.createdAt.toDate().toISOString() : '',
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

  const handleDelete = async (docId: string) => {
    const pass = prompt('Enter admin password to confirm delete:');
    if (pass !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      alert('❌ Incorrect password');
      return;
    }

    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteDoc(doc(db, 'products', docId));
      setProducts((prev) => prev.filter((p) => p.docId !== docId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  const openEditModal = (product: Product) => {
    const pass = prompt('Enter admin password to edit:');
    if (pass !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
      alert('❌ Incorrect password');
      return;
    }

    setEditProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      rating: product.rating,
      image: product.image,
      images: product.images.join(', '),
      title: product.additionalInfo?.title ?? '',
      detailsDescription: product.additionalInfo?.detailsDescription ?? '',
      brand: product.additionalInfo?.brand ?? '',
      material: product.additionalInfo?.material ?? '',
      colorOptions: product.additionalInfo?.colorOptions?.join(', ') ?? '',
      warrantyPeriod: product.additionalInfo?.warrantyPeriod ?? '',
      returnPolicy: product.additionalInfo?.returnPolicy ?? '',
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editProduct?.docId) return;

    try {
      const updatedData = {
        name: editForm.name,
        category: editForm.category,
        price: Number(editForm.price),
        rating: Number(editForm.rating),
        description: editForm.description,
        image: editForm.image,
        images: editForm.images.split(',').map((img: string) => img.trim()),
        additionalInfo: {
          title: editForm.title,
          detailsDescription: editForm.detailsDescription,
          brand: editForm.brand,
          material: editForm.material,
          colorOptions: editForm.colorOptions
            .split(',')
            .map((c: string) => c.trim())
            .filter(Boolean),
          warrantyPeriod: editForm.warrantyPeriod,
          returnPolicy: editForm.returnPolicy,
        },
      };

      await updateDoc(doc(db, 'products', editProduct.docId), updatedData);

      setProducts((prev) =>
        prev.map((p) => (p.docId === editProduct.docId ? { ...p, ...updatedData } : p))
      );

      alert('✅ Product updated successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('❌ Error updating product:', error);
      alert('Failed to update product.');
    }
  };

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
              <span className="text-sm font-semibold text-gray-800">Rs {maxPrice}</span>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading products...</p>
          ) : paginatedProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <div key={product.id || product.docId} className="relative group">
                  <ProductCard product={product} />
                  {isAdmin && (
                    <div className="flex justify-center gap-3 mt-2 transition">
                      <button
                        onClick={() => openEditModal(product)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.docId!)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center col-span-full py-10">No products found 😔</p>
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

      {/* ✏️ Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#fff4f4]/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto my-10">
            <h2 className="text-2xl font-semibold mb-4 text-center text-red-600">Edit Product</h2>
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
              {Object.entries({
                name: 'Product Name',
                category: 'Category',
                price: 'Price',
                rating: 'Rating',
                description: 'Description',
                image: 'Main Image URL',
                images: 'Additional Images (comma separated)',
                title: 'Additional Info Title',
                detailsDescription: 'Details Description',
                brand: 'Brand',
                material: 'Material',
                colorOptions: 'Color Options (comma separated)',
                warrantyPeriod: 'Warranty Period',
                returnPolicy: 'Return Policy',
              }).map(([key, label]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type="text"
                    value={editForm[key] ?? ''}
                    onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                    className="w-full rounded-md p-3 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md text-white bg-green-600 text-white hover:bg-green-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
