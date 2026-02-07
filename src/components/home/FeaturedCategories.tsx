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
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <h2 className="text-display-md font-bold tracking-tight text-center text-foreground mb-16">
            {t.categories.title}
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" staggerDelay={0.2}>
          {categories.map((category) => (
            <StaggerItem key={category.name}>
              <Link
                to={category.href}
                className="group block relative aspect-square overflow-hidden rounded-lg bg-secondary"
              >
                <motion.img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {category.name}
                  </h3>
                  <motion.div 
                    className="flex items-center gap-2 text-primary font-medium"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>{t.categories.shopNow}</span>
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
