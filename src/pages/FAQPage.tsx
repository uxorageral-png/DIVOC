import { Layout } from '@/components/layout';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQPage() {
  const { t } = useLanguage();

  const faqs = [
    { q: t.faq.shipping.q, a: t.faq.shipping.a },
    { q: t.faq.returns.q, a: t.faq.returns.a },
    { q: t.faq.sizing.q, a: t.faq.sizing.a },
    { q: t.faq.payment.q, a: t.faq.payment.a },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-card border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="font-bebas text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground">
              {t.faq.title}
            </h1>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border bg-card rounded-lg px-6 data-[state=open]:border-primary/50"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 lg:py-32 bg-card border-t border-border">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              {t.contact.subtitle}
            </p>
            <a
              href="/contact"
              className="inline-block font-bebas text-2xl tracking-wider text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              {t.contact.title} →
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
