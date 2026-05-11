import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-bg.jpg';

export function HeroSection() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  const next = () => setActiveSlide((s) => (s + 1) % totalSlides);
  const prev = () => setActiveSlide((s) => (s - 1 + totalSlides) % totalSlides);

  return (
    <section className="relative bg-[hsl(40_30%_94%)] overflow-hidden">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[640px] lg:min-h-[calc(100vh-9rem)]">
        {/* Right: image (mobile = background) */}
        <div className="absolute inset-0 lg:static lg:order-2">
          <img
            src={heroBg}
            alt={t.hero.headline}
            className="w-full h-full object-cover object-center"
          />
          {/* Mobile readability veil */}
          <div className="absolute inset-0 lg:hidden bg-gradient-to-r from-[hsl(40_30%_94%)] via-[hsl(40_30%_94%/0.85)] to-[hsl(40_30%_94%/0.35)]" />
          {/* Desktop seam blend into cream */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[hsl(40_30%_94%)] to-transparent pointer-events-none" />
        </div>

        {/* Left: copy */}
        <div className="relative z-10 lg:order-1 flex items-center px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-24">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-3 mb-6 text-primary text-[11px] sm:text-xs font-semibold tracking-[0.32em] uppercase">
              Voice of African Union
            </span>

            <h1 className="font-display text-[clamp(2.75rem,8.5vw,6.25rem)] leading-[0.92] tracking-[-0.01em] text-foreground mb-6 [text-wrap:balance]">
              {t.hero.headline}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed font-light">
              {t.hero.subheadline}
            </p>

            <Button
              asChild
              className="group h-12 px-7 rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase shadow-premium-md hover:shadow-premium-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <Link to="/products">
                {t.hero.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Carousel chevrons */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-background/80 hover:bg-background backdrop-blur border border-border shadow-premium-sm flex items-center justify-center text-foreground transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-background/80 hover:bg-background backdrop-blur border border-border shadow-premium-sm flex items-center justify-center text-foreground transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActiveSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeSlide ? 'w-6 bg-foreground' : 'w-2 bg-foreground/30 hover:bg-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
