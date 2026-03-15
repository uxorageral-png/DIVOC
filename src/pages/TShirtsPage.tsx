import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TShirtsPage() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <SEO title="T-Shirts" description="T-Shirts premium DIVOC. Streetwear com identidade africana." canonical="/products/tshirts" />
      <section className="py-20 lg:py-32 bg-background min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <ProductGrid 
            title={t.nav.tshirts} 
            query="product_type:T-Shirts"
          />
        </div>
      </section>
    </Layout>
  );
}
