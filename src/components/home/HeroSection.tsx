import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import heroModel from '@/assets/hero-model.jpg';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative -mt-16 lg:-mt-20 min-h-[100svh] lg:min-h-screen w-full overflow-hidden bg-[hsl(40_30%_96%)]">
      {/* Subtle African-inspired pattern wash on the left half */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='220' height='220' viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a47330' stroke-width='1'%3E%3Ccircle cx='110' cy='110' r='100'/%3E%3Ccircle cx='110' cy='110' r='72'/%3E%3Ccircle cx='110' cy='110' r='44'/%3E%3Cpath d='M10 110 L210 110 M110 10 L110 210 M40 40 L180 180 M180 40 L40 180'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: '420px 420px',
          backgroundPosition: 'center',
        }}
      />

      {/* Soft warm gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(43_60%_92%)_0%,hsl(40_30%_97%)_45%,hsl(40_25%_98%)_100%)]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[100svh] lg:min-h-screen">
        {/* Copy column */}
        <div className="lg:col-span-6 xl:col-span-7 flex items-center pt-28 pb-14 sm:pt-32 lg:py-24">
          <div className="w-full px-6 sm:px-10 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-12">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-3 mb-6 sm:mb-8 text-[hsl(var(--gold-dark))] text-[10px] sm:text-[11px] font-semibold tracking-[0.32em] uppercase"
            >
              <span className="h-px w-10 bg-[hsl(var(--gold-dark))]/60" />
              Voice of African Union
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-[clamp(2.75rem,9.5vw,7rem)] leading-[0.92] tracking-[-0.015em] text-foreground mb-6 sm:mb-8 [text-wrap:balance]"
            >
              {t.hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-base sm:text-lg text-muted-foreground max-w-md mb-10 sm:mb-12 leading-relaxed font-light"
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-4"
            >
              <Button
                asChild
                className="group h-12 px-8 rounded-none bg-foreground text-background hover:bg-foreground/90 text-xs font-semibold tracking-[0.2em] uppercase shadow-premium-md hover:shadow-premium-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <Link to="/products">
                  {t.hero.cta}
                  <span aria-hidden className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </Button>
            </motion.div>

            {/* Carousel-style indicators (decorative, single slide) */}
            <div className="hidden sm:flex items-center gap-2 mt-16">
              <span className="h-1 w-6 rounded-full bg-foreground/70" />
              <span className="h-1 w-1.5 rounded-full bg-foreground/20" />
              <span className="h-1 w-1.5 rounded-full bg-foreground/20" />
            </div>
          </div>
        </div>

        {/* Image column */}
        <div className="relative lg:col-span-6 xl:col-span-5 min-h-[60vh] lg:min-h-full">
          <motion.img
            src={heroModel}
            alt="DIVOC — Porte ton identité"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          {/* Soft fade blend into cream on the left edge (desktop only) */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[hsl(40_30%_96%)] to-transparent pointer-events-none" />
          {/* Fade into next section bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        </div>
      </div>

      {/* Carousel arrows (decorative) */}
      <button
        aria-label="Previous"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border/60 text-foreground hover:bg-background transition-all hover:-translate-x-0.5"
      >
        ‹
      </button>
      <button
        aria-label="Next"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border/60 text-foreground hover:bg-background transition-all hover:translate-x-0.5"
      >
        ›
      </button>
    </section>
  );
}
