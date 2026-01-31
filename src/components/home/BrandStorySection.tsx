import { useLanguage } from '@/contexts/LanguageContext';
import brandStoryImg from '@/assets/brand-story.jpg';

export function BrandStorySection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-lg">
            <img 
              src={brandStoryImg} 
              alt="DIVOC Brand Story" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <h2 className="text-display-md font-bold tracking-tight text-foreground mb-8">
              {t.brand.title}
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
              {t.brand.text}
            </p>
            <div className="flex flex-wrap gap-4">
              {['Identity', 'Power', 'Roots', 'Movement', 'Legacy'].map((keyword) => (
                <span 
                  key={keyword}
                  className="px-4 py-2 border border-primary/30 rounded-full text-sm font-medium text-primary tracking-wide"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
