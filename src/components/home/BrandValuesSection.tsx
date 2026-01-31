import { Gem, Fingerprint, Globe2, Footprints } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {values.map(({ key, label, Icon }) => (
            <div key={key} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-primary/30 mb-6">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold tracking-wide text-foreground uppercase">
                {label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
