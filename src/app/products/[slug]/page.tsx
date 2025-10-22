import { productsData } from '@/lib/peoductData';
import Section from './Section';
import { Metadata } from 'next';

interface ProductPageProps {
  params: { slug: string };
}

// Dynamic metadata function
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = productsData.find((pro) => pro.id === params.slug);

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

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const product = productsData.find((pro) => pro.id === params.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c1425] text-white">
        Product not found.
      </div>
    );
  }

  return (
    // @ts-ignore
    <Section product={product} />
  );
};

export default ProductPage;
