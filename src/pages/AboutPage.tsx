import { Layout } from '@/components/layout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-card border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="font-bebas text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground mb-6">
              {t.about.title}
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold tracking-wide">
              {t.about.intro}
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8">
                <div className="w-16 h-1 bg-primary" />
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {t.about.story}
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {t.about.mission}
                </p>
              </div>
              <div className="relative aspect-[4/5] bg-card rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-bebas text-8xl md:text-9xl text-primary/10 tracking-widest">
                    DIVOC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-32 bg-card border-t border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {[
                { key: 'identity', label: t.brand.values.identity },
                { key: 'culture', label: t.brand.values.culture },
                { key: 'quality', label: t.brand.values.quality },
                { key: 'street', label: t.brand.values.street },
              ].map(({ key, label }) => (
                <div key={key} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 border border-primary/30 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </div>
                  <h3 className="font-bebas text-2xl tracking-wider text-foreground uppercase">
                    {label}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manifesto Quote */}
        <section className="py-20 lg:py-32 border-t border-border">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <blockquote className="max-w-3xl mx-auto">
              <p className="font-bebas text-3xl md:text-4xl lg:text-5xl tracking-wide text-foreground leading-tight">
                "POWER IN EVERY PIECE. ROOTS IN EVERY THREAD."
              </p>
              <footer className="mt-8">
                <div className="w-12 h-1 bg-primary mx-auto" />
              </footer>
            </blockquote>
          </div>
        </section>
      </div>
    </Layout>
  );
}
