import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import {
  HeroSection,
  BrandStorySection,
  FeaturedCategories,
  FeaturedProducts,
  BrandValuesSection,
} from '@/components/home';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DIVOC',
  url: 'https://divoc.lovable.app',
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
      <BrandValuesSection />
    </Layout>
  );
};

export default Index;
