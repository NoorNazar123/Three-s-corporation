import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Section from "./Section";
import type { Metadata } from "next";

interface Product {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  images: string[];
  price: number;
  discount: number;
  description: string;
  createdAt?: string;
  docId?: string;
}

interface ProductPageProps {
  params: { slug: string };
}

// 🧠 Fetch product data from Firestore
async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const q = query(collection(db, "products"), where("id", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();

    const cleanImages = Array.isArray(data.images)
      ? data.images.map((img: string) =>
          typeof img === "string" ? img.replace(/^'+|'+$/g, "").trim() : ""
        )
      : data.images
      ? [data.images.replace(/^'+|'+$/g, "").trim()]
      : [];

    // 🧩 FIX: Convert Firestore Timestamp to ISO string
    let createdAt = "";
    if (data.createdAt && data.createdAt.toDate) {
      createdAt = data.createdAt.toDate().toISOString();
    }

    return {
      id: data.id ?? slug,
      name: data.name ?? "Unnamed Product",
      category: data.category ?? "Uncategorized",
      rating: data.rating ?? 0,
      image:
        typeof data.image === "string"
          ? data.image.replace(/^'+|'+$/g, "").trim()
          : "",
      images: cleanImages,
      price: data.price ?? 0,
      discount: data.discount ?? 0,
      description: data.description ?? "No description available.",
      createdAt,
      docId: docSnap.id,
    };
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const  resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found | 3S Corporation",
      description: "This product could not be found on 3S Corporation website.",
    };
  }

  return {
    title: `${product.name} | 3S Corporation`,
    description:
      product.description ||
      "Explore our wide range of products at 3S Corporation.",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const  resolvedParams = await params;
  const product = await getProductBySlug( resolvedParams.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c1425] text-white">
        Product not found.
      </div>
    );
  }
  // @ts-ignore
  return <Section product={product} />;
}
