import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import hommeHoodies from '@/assets/category-homme-hoodies.jpg';
import hommeTshirts from '@/assets/category-homme-tshirts.jpg';
import femmeHoodies from '@/assets/category-femme-hoodies.jpg';
import femmeTshirts from '@/assets/category-femme-tshirts.jpg';

export function FeaturedCategories() {
  const { t } = useLanguage();

  const categories = [
    { eyebrow: t.nav.masculine, name: t.categories.hoodies, href: '/products/masculine/hoodies', image: hommeHoodies },
    { eyebrow: t.nav.masculine, name: t.categories.tshirts, href: '/products/masculine/tshirts', image: hommeTshirts },
    { eyebrow: t.nav.feminine, name: t.categories.hoodies, href: '/products/feminine/hoodies', image: femmeHoodies },
    { eyebrow: t.nav.feminine, name: t.categories.tshirts, href: '/products/feminine/tshirts', image: femmeTshirts },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 lg:mb-14">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.32em] uppercase text-[hsl(var(--gold-dark))]">
                Collections
              </span>
              <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[0.95] tracking-tight text-foreground">
                Nos Indispensables
              </h2>
            </div>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              <span className="border-b border-foreground/20 group-hover:border-foreground pb-0.5 transition-colors">
                {t.nav.allProducts}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          staggerDelay={0.1}
        >
          {categories.map((c) => (
            <StaggerItem key={`${c.eyebrow}-${c.name}`}>
              <Link
                to={c.href}
                className="group block relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary shadow-premium-sm hover:shadow-premium-lg transition-shadow duration-500"
              >
                <motion.img
                  src={c.image}
                  alt={`${c.eyebrow} ${c.name}`}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 flex items-end justify-between">
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.28em] uppercase text-background/80 mb-1.5">
                      {c.eyebrow}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-display tracking-tight text-background">
                      {c.name}
                    </h3>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-background/40 text-background backdrop-blur-sm transition-all group-hover:bg-background group-hover:text-foreground group-hover:border-background">
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
