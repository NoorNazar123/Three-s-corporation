import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Section from './Section';
import type { Metadata } from 'next';

// 🧩 Product interface
interface AdditionalInfo {
  title?: string;
  detailsDescription?: string;
  brand?: string;
  material?: string;
  colorOptions?: string[];
  warrantyPeriod?: string;
  returnPolicy?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  images: string[];
  price: number;
  discount?: number;
  description: string;
  createdAt?: string;
  additionalInfo?: AdditionalInfo | null;
  docId?: string;
}

interface ProductPageProps {
  params: { slug: string };
}

// 🔍 Fetch product data from Firestore
async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const q = query(collection(db, 'products'), where('id', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();

    // 🖼 Clean images
    const cleanImages = Array.isArray(data.images)
      ? data.images.map((img: string) =>
          typeof img === 'string' ? img.replace(/^'+|'+$/g, '').trim() : ''
        )
      : data.images
        ? [data.images.replace(/^'+|'+$/g, '').trim()]
        : [];

    // 🕒 Convert Firestore Timestamp
    const createdAt =
      data.createdAt && data.createdAt.toDate ? data.createdAt.toDate().toISOString() : '';

    // ✅ Build product object
    return {
      id: data.id ?? slug,
      name: data.name ?? 'Unnamed Product',
      category: data.category ?? 'Uncategorized',
      rating: data.rating ?? 0,
      image: typeof data.image === 'string' ? data.image.replace(/^'+|'+$/g, '').trim() : '',
      images: cleanImages,
      price: data.price ?? 0,
      discount: data.discount ?? 0,
      description: data.description ?? 'No description available.',
      createdAt,
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
      docId: docSnap.id,
    };
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    return null;
  }
}

// 🧠 SEO Metadata
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: 'Product Not Found | 3S Corporation',
      description: 'This product could not be found on 3S Corporation website.',
    };
  }

  return {
    title: `${product.name} | 3S Corporation`,
    description: product.description || 'Explore our wide range of products at 3S Corporation.',
  };
}

// 🧩 Page Component
export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return (
      <div className="py-44 flex flex-col items-center justify-center text-white text-center space-y-4">
      <h1 className="text-3xl font-bold text-[#c60000]">Product Not Found</h1>
      <p className="text-gray-400">
        The product you’re looking for doesn’t exist or may have been removed.
      </p>

      <div className="flex gap-4 mt-2">
        <a
          href="/"
          className="bg-[#c60000] hover:bg-[#e00000] text-white px-4 py-2 rounded-md transition-all"
        >
          Home
        </a>
      </div>
    </div>
    );
  }

  // @ts-ignore (Section expects correct prop)
  return <Section product={product} />;
}
