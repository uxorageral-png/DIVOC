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
  const { t, language } = useLanguage();

  const categories = [
    { gender: t.nav.masculine, name: t.nav.hoodies, href: '/products/masculine/hoodies', image: catMenHoodies },
    { gender: t.nav.masculine, name: t.nav.tshirts, href: '/products/masculine/tshirts', image: catMenTshirts },
    { gender: t.nav.feminine, name: t.nav.hoodies, href: '/products/feminine/hoodies', image: catWomenHoodies },
    { gender: t.nav.feminine, name: t.nav.tshirts, href: '/products/feminine/tshirts', image: catWomenTshirts },
  ];

  return (
    <section className="py-24 lg:py-36 bg-background">
      <div className="container mx-auto px-5 sm:px-8 lg:px-16">
        <FadeIn>
          <div className="flex items-end justify-between mb-14 lg:mb-20 gap-6 flex-wrap">
            <div>
              <span className="inline-flex items-center gap-4 text-foreground/50 text-[10px] font-medium tracking-[0.4em] uppercase">
                <span className="h-px w-10 bg-foreground/30" />
                {t.categories.title}
              </span>
              <h2 className="mt-5 font-editorial italic text-[clamp(2rem,4vw,3.5rem)] font-normal tracking-tight text-foreground leading-[1.05]">
                {language === 'fr' ? 'Nos Indispensables' : language === 'en' ? 'Our Essentials' : 'Nossos Indispensáveis'}
              </h2>
            </div>
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] uppercase text-foreground transition-colors"
            >
              <span className="border-b border-foreground pb-1">{language === 'fr' ? 'Voir tout' : language === 'en' ? 'View all' : 'Ver tudo'}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.25} />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8"
          staggerDelay={0.1}
        >
          {categories.map((category) => (
            <StaggerItem key={category.gender + category.name}>
              <Link
                to={category.href}
                className="group block relative aspect-[3/4] overflow-hidden bg-secondary"
              >
                <motion.img
                  src={category.image}
                  alt={`${category.gender} ${category.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/5 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7 flex items-end justify-between gap-3">
                  <div className="text-background">
                    <p className="text-[9px] font-medium tracking-[0.35em] uppercase text-background/70 mb-2">
                      {category.gender}
                    </p>
                    <h3 className="text-lg lg:text-xl font-light tracking-wide uppercase">
                      {category.name}
                    </h3>
                  </div>
                  <span className="shrink-0 h-9 w-9 rounded-full border border-background/50 flex items-center justify-center text-background group-hover:bg-background group-hover:text-foreground transition-all duration-500">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} />
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
