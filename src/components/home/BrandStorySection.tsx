import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import brandStoryImg from '@/assets/brand-story.jpg';

export function BrandStorySection() {
  const { t } = useLanguage();

  const keywords = ['Identity', 'Power', 'Roots', 'Movement', 'Legacy'];

  return (
    <section className="py-28 lg:py-44 bg-background overflow-hidden">
      <div className="container mx-auto px-5 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Image */}
          <FadeIn direction="left" distance={50} className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden film-grain">
              <motion.img 
                src={brandStoryImg} 
                alt="DIVOC Brand Story" 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right" distance={50} delay={0.2} className="lg:col-span-6">
            <div className="lg:pl-4">
              <span className="inline-flex items-center gap-4 mb-8 text-foreground/50 text-[10px] font-medium tracking-[0.4em] uppercase">
                <span className="h-px w-10 bg-foreground/30" />
                Manifesto
              </span>
              <h2 className="font-editorial italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-foreground mb-10 [text-wrap:balance]">
                {t.brand.title}
              </h2>
              <p className="text-[15px] lg:text-base text-muted-foreground/90 leading-[1.9] font-light max-w-lg mb-10">
                {t.brand.text}
              </p>
              <StaggerContainer className="flex flex-wrap gap-x-6 gap-y-3" staggerDelay={0.08} delayChildren={0.3}>
                {keywords.map((keyword) => (
                  <StaggerItem key={keyword}>
                    <span className="text-[10px] tracking-[0.35em] uppercase text-foreground/70 font-medium">
                      — {keyword}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
