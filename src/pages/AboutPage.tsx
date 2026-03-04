import { Layout } from '@/components/layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-28 lg:py-40 bg-card border-b border-border overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <span className="font-bebas text-[20rem] md:text-[30rem] tracking-widest text-primary select-none">
              D
            </span>
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <FadeIn>
              <p className="text-primary font-semibold tracking-[0.3em] text-sm md:text-base mb-4 uppercase">
                {t.about.subtitle}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-bebas text-5xl md:text-7xl lg:text-9xl tracking-wider text-foreground mb-8">
                {t.about.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-2xl md:text-3xl lg:text-4xl text-primary font-bebas tracking-wide max-w-3xl">
                {t.about.intro}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 lg:py-36">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <FadeIn direction="left">
                <div className="space-y-10">
                  <div className="w-20 h-1 bg-primary" />
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {t.about.story}
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {t.about.mission}
                  </p>
                  <div className="pt-4">
                    <p className="text-sm text-primary/70 tracking-widest uppercase">
                      {t.about.logo}
                    </p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <div className="relative aspect-[4/5] bg-card rounded-lg overflow-hidden border border-border">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <span className="font-bebas text-7xl md:text-8xl text-primary/20 tracking-[0.2em] mb-4">
                      DIVOC
                    </span>
                    <div className="w-16 h-[2px] bg-primary/30 mb-4" />
                    <span className="text-primary/40 text-sm tracking-[0.4em] uppercase">
                      Legacy
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Manifesto Quote */}
        <section className="py-28 lg:py-40 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <FadeIn>
              <blockquote className="max-w-4xl mx-auto">
                <p className="font-bebas text-3xl md:text-5xl lg:text-6xl tracking-wide text-foreground leading-tight">
                  {t.about.manifesto}
                </p>
                <footer className="mt-10">
                  <div className="w-16 h-1 bg-primary mx-auto" />
                </footer>
              </blockquote>
            </FadeIn>
          </div>
        </section>
      </div>
    </Layout>
  );
}
