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
    { eyebrow: 'Voice of African Union', headline: t.hero.headline, sub: t.hero.subheadline, image: heroModel, position: 'right' },
    { eyebrow: 'Collection 2026', headline: t.hero.headline, sub: t.hero.subheadline, image: catMenHoodies, position: 'center' },
    { eyebrow: 'New Drop', headline: t.hero.headline, sub: t.hero.subheadline, image: catWomenHoodies, position: 'center' },
  ];

  const slide = slides[index];
  const total = slides.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="relative -mt-16 lg:-mt-[76px] bg-background overflow-hidden">
      <div className="relative container mx-auto px-5 sm:px-8 lg:px-16 pt-28 lg:pt-40 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center min-h-[calc(100vh-7rem)]">
          {/* Left: copy */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative z-10 lg:pr-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center gap-4 mb-8 text-foreground/60 text-[10px] font-medium tracking-[0.4em] uppercase">
                  <span className="h-px w-10 bg-foreground/30" />
                  {slide.eyebrow}
                </span>

                <h1 className="font-display text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95] tracking-[0.005em] text-foreground font-normal uppercase [text-wrap:balance] mb-8">
                  {slide.headline}
                </h1>

                <p className="text-[14px] sm:text-[15px] text-muted-foreground/90 max-w-sm mb-12 leading-[1.8] font-light [text-wrap:pretty]">
                  {slide.sub}
                </p>

                <Button
                  asChild
                  variant="ghost"
                  className="group h-auto p-0 rounded-none bg-transparent hover:bg-transparent text-foreground hover:text-foreground text-[11px] font-medium tracking-[0.3em] uppercase transition-all duration-500"
                >
                  <Link to="/products" className="inline-flex flex-col items-start gap-2">
                    <span className="inline-flex items-center gap-4">
                      {t.hero.cta}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.25} />
                    </span>
                    <span className="block h-px w-full bg-foreground origin-left scale-x-100 transition-transform duration-500 group-hover:scale-x-110" />
                  </Link>
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: model image */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] w-full overflow-hidden film-grain"
              >
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className={cn(
                    'w-full h-full object-cover',
                    slide.position === 'right' ? 'object-right' : 'object-center'
                  )}
                  width={1024}
                  height={1280}
                  fetchPriority="high"
                />
                {/* Cinematic vignette for depth */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-foreground/25 via-transparent to-transparent" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-foreground/15" />
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* Carousel arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="hidden md:flex absolute left-5 lg:left-10 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-background/40 backdrop-blur-sm hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-500"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.25} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="hidden md:flex absolute right-5 lg:right-10 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-background/40 backdrop-blur-sm hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-500"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.25} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-px transition-all duration-500',
                i === index ? 'w-10 bg-foreground' : 'w-5 bg-foreground/25 hover:bg-foreground/50'
              )}
            />
          ))}
        </div>

        {/* Slide index counter — editorial detail */}
        <div className="absolute bottom-8 right-5 lg:right-10 z-20 hidden md:flex items-baseline gap-2 text-[10px] tracking-[0.4em] uppercase text-foreground/50">
          <span className="text-foreground font-medium">0{index + 1}</span>
          <span className="h-px w-6 bg-foreground/30" />
          <span>0{total}</span>
        </div>
      </div>
    </section>
  );
}
