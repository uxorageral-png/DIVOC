import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import brandStoryImg from '@/assets/brand-story.jpg';

export function BrandStorySection() {
  const { t } = useLanguage();

  const keywords = ['Identity', 'Power', 'Roots', 'Movement', 'Legacy'];

  return (
    <section className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <FadeIn direction="left" distance={50}>
            <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-lg">
              <motion.img 
                src={brandStoryImg} 
                alt="DIVOC Brand Story" 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right" distance={50} delay={0.2}>
            <div className="lg:pl-8">
              <h2 className="text-display-md font-bold tracking-tight text-foreground mb-8">
                {t.brand.title}
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
                {t.brand.text}
              </p>
              <StaggerContainer className="flex flex-wrap gap-4" staggerDelay={0.1} delayChildren={0.3}>
                {keywords.map((keyword) => (
                  <StaggerItem key={keyword}>
                    <motion.span 
                      className="inline-block px-4 py-2 border border-primary/30 rounded-full text-sm font-medium text-primary tracking-wide"
                      whileHover={{ 
                        scale: 1.05, 
                        borderColor: 'hsl(var(--primary))',
                        backgroundColor: 'hsl(var(--primary) / 0.1)'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {keyword}
                    </motion.span>
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
