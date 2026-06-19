import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useLanguage } from '@/contexts/LanguageContext';

type Gender = 'feminine' | 'masculine';
type ProductType = 'hoodies' | 'tshirts' | 'shoes';

interface CategoryPageProps {
  gender: Gender;
  productType: ProductType;
}

export default function CategoryPage({ gender, productType }: CategoryPageProps) {
  const { t } = useLanguage();

  const productTypeTag =
    productType === 'hoodies' ? 'Hoodies' : productType === 'tshirts' ? 'T-Shirts' : 'Shoes';
  const genderTag = gender === 'feminine' ? 'feminine' : 'masculine';
  const query = `product_type:${productTypeTag} AND tag:${genderTag}`;

  const genderLabel = gender === 'feminine' ? t.nav.feminine : t.nav.masculine;
  const typeLabel =
    productType === 'hoodies' ? t.nav.hoodies : productType === 'tshirts' ? t.nav.tshirts : t.nav.shoes;
  const title = `${genderLabel} — ${typeLabel}`;
  const canonical = `/products/${gender}/${productType}`;

  return (
    <Layout>
      <SEO
        title={title}
        description={`${title} DIVOC — streetwear premium com raízes africanas.`}
        canonical={canonical}
      />
      <section className="py-20 lg:py-32 bg-background min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <ProductGrid title={title} query={query} />
        </div>
      </section>
    </Layout>
  );
}