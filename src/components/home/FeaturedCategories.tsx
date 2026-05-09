import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import categoryHoodies from '@/assets/category-hoodies.jpg';
import categoryTshirts from '@/assets/category-tshirts.jpg';

export function FeaturedCategories() {
  const { t } = useLanguage();

  const categories = [
    { 
      name: t.categories.hoodies, 
      href: '/products/hoodies', 
      image: categoryHoodies 
    },
    { 
      name: t.categories.tshirts, 
      href: '/products/tshirts', 
      image: categoryTshirts 
    },
  ];

  return (
    <section className="py-24 lg:py-36 bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">Collections</span>
            <h2 className="mt-4 text-display-md font-bold tracking-tight text-foreground">
              {t.categories.title}
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10" staggerDelay={0.2}>
          {categories.map((category) => (
            <StaggerItem key={category.name}>
              <Link
                to={category.href}
                className="group block relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shadow-premium-md hover:shadow-premium-xl transition-shadow duration-500"
              >
                <motion.img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <h3 className="text-3xl lg:text-4xl font-bold text-background mb-4">
                    {category.name}
                  </h3>
                  <motion.div 
                    className="flex items-center gap-2 text-primary-glow font-medium"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-background">{t.categories.shopNow}</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </motion.div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
