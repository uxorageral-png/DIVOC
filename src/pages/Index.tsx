import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import {
  HeroSection,
  BrandStorySection,
  FeaturedCategories,
  FeaturedProducts,
  ShoesSection,
  BrandValuesSection,
} from '@/components/home';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DIVOC',
  url: 'https://www.divocluxury.com',
  description: 'Streetwear premium com raízes africanas.',
  sameAs: ['https://www.instagram.com/divoc.luxury'],
};

const Index = () => {
  return (
    <Layout>
      <SEO canonical="/" jsonLd={jsonLd} />
      <HeroSection />
      <BrandStorySection />
      <FeaturedCategories />
      <FeaturedProducts />
      <ShoesSection />
      <BrandValuesSection />
    </Layout>
  );
};

export default Index;
