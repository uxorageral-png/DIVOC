import { Layout } from '@/components/layout';
import {
  HeroSection,
  BrandStorySection,
  FeaturedCategories,
  FeaturedProducts,
  BrandValuesSection,
  InstagramSection,
} from '@/components/home';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BrandStorySection />
      <FeaturedCategories />
      <FeaturedProducts />
      <InstagramSection />
      <BrandValuesSection />
    </Layout>
  );
};

export default Index;
