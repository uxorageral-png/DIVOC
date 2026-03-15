import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductsPage() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <SEO title="Produtos" description="Descobre a coleção completa DIVOC. Streetwear premium com raízes africanas — hoodies, t-shirts e mais." canonical="/products" />
      <section className="py-20 lg:py-32 bg-background min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <ProductGrid title={t.nav.allProducts} />
        </div>
      </section>
    </Layout>
  );
}
