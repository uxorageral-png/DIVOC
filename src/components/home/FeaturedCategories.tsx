import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import catMenHoodies from '@/assets/cat-men-hoodies.jpg';
import catMenTshirts from '@/assets/cat-men-tshirts.jpg';
import catWomenHoodies from '@/assets/cat-women-hoodies.jpg';
import catWomenTshirts from '@/assets/cat-women-tshirts.jpg';

export function FeaturedCategories() {
  const { t } = useLanguage();

  const categories = [
    { gender: t.nav.masculine, name: t.nav.hoodies, href: '/products/masculine/hoodies', image: catMenHoodies },
    { gender: t.nav.masculine, name: t.nav.tshirts, href: '/products/masculine/tshirts', image: catMenTshirts },
    { gender: t.nav.feminine, name: t.nav.hoodies, href: '/products/feminine/hoodies', image: catWomenHoodies },
    { gender: t.nav.feminine, name: t.nav.tshirts, href: '/products/feminine/tshirts', image: catWomenTshirts },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <FadeIn>
          <div className="flex items-end justify-between mb-10 lg:mb-14 gap-6 flex-wrap">
            <div>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[hsl(38_65%_42%)]">
                {t.categories.title}
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-foreground">
                {t.categories.title === 'COLLECTIONS' ? 'Nos Indispensables' : t.categories.title === 'CATEGORIES' ? 'Our Essentials' : 'Nossos Indispensáveis'}
              </h2>
            </div>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-foreground hover:text-[hsl(38_65%_42%)] transition-colors"
            >
              <span>{t.categories.title === 'COLLECTIONS' ? 'Voir tous les produits' : t.categories.title === 'CATEGORIES' ? 'View all products' : 'Ver todos os produtos'}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          staggerDelay={0.1}
        >
          {categories.map((category) => (
            <StaggerItem key={category.gender + category.name}>
              <Link
                to={category.href}
                className="group block relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shadow-premium-sm hover:shadow-premium-lg transition-shadow duration-500"
              >
                <motion.img
                  src={category.image}
                  alt={`${category.gender} ${category.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 flex items-end justify-between gap-3">
                  <div className="text-background">
                    <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-background/70 mb-1">
                      {category.gender}
                    </p>
                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight">
                      {category.name}
                    </h3>
                  </div>
                  <span className="shrink-0 h-10 w-10 rounded-full border border-background/40 flex items-center justify-center text-background backdrop-blur-sm bg-background/10 group-hover:bg-background group-hover:text-foreground transition-all duration-300">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
