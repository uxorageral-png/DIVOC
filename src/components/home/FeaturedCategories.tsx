import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
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
        <h2 className="text-display-md font-bold tracking-tight text-center text-foreground mb-16">
          {t.categories.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative aspect-square overflow-hidden rounded-lg bg-secondary"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {category.name}
                </h3>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>{t.categories.shopNow}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
