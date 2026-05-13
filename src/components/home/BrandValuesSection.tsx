import { motion } from 'framer-motion';
import { Gem, Fingerprint, Globe2, Footprints } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const icons = {
  quality: Gem,
  identity: Fingerprint,
  culture: Globe2,
  street: Footprints,
};

export function BrandValuesSection() {
  const { t } = useLanguage();

  const values = [
    { key: 'quality', label: t.brand.values.quality, Icon: icons.quality },
    { key: 'identity', label: t.brand.values.identity, Icon: icons.identity },
    { key: 'culture', label: t.brand.values.culture, Icon: icons.culture },
    { key: 'street', label: t.brand.values.street, Icon: icons.street },
  ];

  return (
    <section className="py-24 lg:py-32 bg-secondary/40 border-t border-border/60">
      <div className="container mx-auto px-5 lg:px-16">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16" staggerDelay={0.12}>
          {values.map(({ key, label, Icon }) => (
            <StaggerItem key={key}>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 mb-6 transition-transform duration-500 group-hover:-translate-y-1">
                  <Icon className="h-6 w-6 text-foreground/80" strokeWidth={1.25} />
                </div>
                <h3 className="text-[10px] font-medium tracking-[0.35em] text-foreground uppercase">
                  {label}
                </h3>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
