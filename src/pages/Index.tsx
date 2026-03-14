import { Layout } from '@/components/layout';
import {
  HeroSection,
  BrandStorySection,
  FeaturedCategories,
  FeaturedProducts,
  BrandValuesSection,
} from '@/components/home';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BrandStorySection />
      <FeaturedCategories />
      <FeaturedProducts />
      <BrandValuesSection />
    </Layout>
  );
};

export default Index;
