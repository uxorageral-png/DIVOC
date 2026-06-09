import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ShoesPage() {
  const { language } = useLanguage();

  const title =
    language === 'fr' ? 'Chaussures' : language === 'en' ? 'Footwear' : 'Calçado';

  return (
    <Layout>
      <SEO
        title={title}
        description={`${title} DIVOC — streetwear premium com raízes africanas.`}
        canonical="/products/shoes"
      />
      <section className="py-20 lg:py-32 bg-background min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <ProductGrid title={title} query="product_type:Shoes" />
        </div>
      </section>
    </Layout>
  );
}
