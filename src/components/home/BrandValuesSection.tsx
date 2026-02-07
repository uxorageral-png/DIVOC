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
    <section className="py-20 lg:py-32 bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" staggerDelay={0.15}>
          {values.map(({ key, label, Icon }) => (
            <StaggerItem key={key}>
              <motion.div 
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-primary/30 mb-6"
                  whileHover={{ 
                    scale: 1.1, 
                    borderColor: 'hsl(var(--primary))',
                    boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold tracking-wide text-foreground uppercase">
                  {label}
                </h3>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
