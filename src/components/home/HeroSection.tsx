import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import heroModel from '@/assets/hero-model.jpg';
import catMenHoodies from '@/assets/cat-men-hoodies.jpg';
import catWomenHoodies from '@/assets/cat-women-hoodies.jpg';

export function HeroSection() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  const slides = [
    { eyebrow: 'Voice of African Union', headline: t.hero.headline, sub: t.hero.subheadline, image: heroModel },
    { eyebrow: 'Collection 2026', headline: t.hero.headline, sub: t.hero.subheadline, image: catMenHoodies },
    { eyebrow: 'New Drop', headline: t.hero.headline, sub: t.hero.subheadline, image: catWomenHoodies },
  ];

  const slide = slides[index];
  const total = slides.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="relative -mt-16 lg:-mt-20 bg-[hsl(40_30%_95%)] overflow-hidden">
      {/* Subtle African pattern wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='420' height='420' viewBox='0 0 420 420'><g fill='none' stroke='%23B8860B' stroke-width='1'><circle cx='210' cy='210' r='180'/><circle cx='210' cy='210' r='140'/><circle cx='210' cy='210' r='100'/><circle cx='210' cy='210' r='60'/><g><path d='M210 30 L220 70 L260 60 L235 95 L270 120 L225 120 L210 165 L195 120 L150 120 L185 95 L160 60 L200 70 Z'/></g></g></svg>\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '70% center',
          backgroundSize: 'min(85vh, 780px)',
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 pt-24 lg:pt-32 pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-7rem)]">
          {/* Left: copy */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="inline-flex items-center gap-3 mb-6 text-[hsl(38_65%_42%)] text-[10px] sm:text-[11px] font-semibold tracking-[0.32em] uppercase">
                  <span className="h-px w-8 bg-[hsl(38_65%_42%)]/60" />
                  {slide.eyebrow}
                </span>

                <h1 className="font-display text-[clamp(2.5rem,9.5vw,7.5rem)] leading-[0.92] tracking-[-0.02em] text-foreground font-extrabold uppercase [text-wrap:balance] mb-6">
                  {slide.headline}
                </h1>

                <p className="text-[15px] sm:text-base lg:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed font-light [text-wrap:pretty]">
                  {slide.sub}
                </p>

                <Button
                  asChild
                  className="group h-12 px-8 rounded-none bg-foreground text-background hover:bg-foreground/90 text-[11px] font-semibold tracking-[0.22em] uppercase shadow-premium-md hover:shadow-premium-lg transition-all duration-300"
                >
                  <Link to="/products" className="inline-flex items-center gap-3">
                    {t.hero.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: model image */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] w-full"
              >
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className="w-full h-full object-cover object-center"
                  width={1024}
                  height={1280}
                  fetchPriority="high"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-background/90 backdrop-blur border border-border/60 shadow-premium-sm hover:shadow-premium-md hover:bg-background transition-all"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-background/90 backdrop-blur border border-border/60 shadow-premium-sm hover:shadow-premium-md hover:bg-background transition-all"
        >
          <ChevronRight className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === index ? 'w-8 bg-foreground' : 'w-1.5 bg-foreground/30 hover:bg-foreground/50'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
