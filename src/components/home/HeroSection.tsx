import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-bg.jpg';

export function HeroSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative -mt-16 lg:-mt-20 min-h-screen flex items-end lg:items-center justify-start overflow-hidden bg-[hsl(30_12%_10%)]"
    >
      {/* Cinematic background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})`, y: bgY }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Editorial gradient veils — calibrated for WCAG AA on white text */}
      {/* Bottom-up readability scrim: ~0.92 alpha at text band, fades up for cinematic depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(30_15%_6%/0.92)_0%,hsl(30_15%_6%/0.78)_28%,hsl(30_15%_6%/0.45)_55%,hsl(30_15%_6%/0.12)_80%,transparent_100%)]" />
      {/* Left-side editorial darken behind copy */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(30_15%_6%/0.65)_0%,hsl(30_15%_6%/0.25)_45%,transparent_75%)]" />
      {/* Subtle warm wash for brand temperature */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(38_65%_42%/0.10),transparent_60%)]" />
      {/* Soft fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 pb-20 sm:pb-24 lg:pb-0 pt-28 sm:pt-32 lg:pt-24"
      >
        <div className="max-w-[18ch] sm:max-w-xl lg:max-w-3xl">
          <motion.span
            className="inline-flex items-center gap-3 mb-6 sm:mb-8 text-[hsl(43_78%_70%)] text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] sm:tracking-[0.32em] uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="h-px w-8 sm:w-10 bg-[hsl(43_78%_70%)]/60" />
            Voice of African Union
          </motion.span>

          <motion.h1
            className="font-display text-[clamp(2.75rem,11vw,7rem)] leading-[0.95] sm:leading-[0.92] tracking-[-0.015em] text-white mb-6 sm:mb-8 [text-wrap:balance] hyphens-none break-words [text-shadow:0_2px_24px_hsl(30_15%_4%/0.45)]"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {t.hero.headline}
          </motion.h1>

          <motion.p
            className="text-[15px] sm:text-base lg:text-lg text-white/90 max-w-md sm:max-w-lg lg:max-w-xl mb-10 sm:mb-12 leading-relaxed font-light [text-wrap:pretty] [text-shadow:0_1px_12px_hsl(30_15%_4%/0.5)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.div
            className="flex items-center gap-3 sm:gap-4 flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Button
              asChild
              className="h-12 px-8 rounded-full bg-white text-[hsl(30_12%_10%)] hover:bg-white/90 text-sm font-medium tracking-wide shadow-premium-md hover:shadow-premium-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <Link to="/products">{t.hero.cta}</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Editorial corner mark */}
      <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3 text-white/50 text-[10px] tracking-[0.3em] uppercase z-10">
        <span className="h-px w-8 bg-white/30" />
        Collection 2026
      </div>
    </section>
  );
}
