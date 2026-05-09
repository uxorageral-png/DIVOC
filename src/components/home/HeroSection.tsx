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
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})`, y: bgY }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/30" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 lg:px-8 text-center max-w-5xl">
        <motion.span
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-semibold tracking-[0.2em] uppercase bg-background/60 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          DIVOC — Voice of African Union
        </motion.span>
        <motion.h1
          className="text-display-xl font-bold tracking-tight text-foreground mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.hero.headline}
        </motion.h1>
        <motion.p
          className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.hero.subheadline}
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Button
            asChild
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 text-base px-10 py-6 font-semibold tracking-wide rounded-full shadow-premium-md hover:shadow-premium-lg transition-all"
          >
            <Link to="/products">{t.hero.cta}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-foreground/20 bg-background/60 backdrop-blur-sm text-foreground hover:bg-background text-base px-10 py-6 font-semibold tracking-wide rounded-full"
          >
            <Link to="/lookbook">Lookbook</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
