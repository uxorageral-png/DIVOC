import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HoodiesPage() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <SEO title="Hoodies" description="Hoodies premium DIVOC com raízes africanas. Conforto e estilo streetwear." canonical="/products/hoodies" />
      <section className="py-20 lg:py-32 bg-background min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <ProductGrid 
            title={t.nav.hoodies} 
            query="product_type:Hoodies"
          />
        </div>
      </section>
    </Layout>
  );
}
