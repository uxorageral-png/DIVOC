import { useState } from 'react';
import { Layout } from '@/components/layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully!');
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-card border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="font-bebas text-5xl md:text-7xl lg:text-8xl tracking-wider text-foreground mb-6">
              {t.contact.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {t.contact.subtitle}
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.name}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="bg-card border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.email}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-card border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      {t.contact.message}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="bg-card border-border focus:border-primary resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                  >
                    {isSubmitting ? '...' : t.contact.send}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-12">
                <div>
                  <div className="w-16 h-1 bg-primary mb-8" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.about.intro}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground">Divoc.luxury@gmail.com</p>
                    </div>
                  </div>

                  <a href="https://www.instagram.com/divoc.luxury?igsh=Zjl4cmtkeDFocGt1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center">
                      <Instagram className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instagram</p>
                      <p className="text-foreground">DIVOC</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground">Lisboa, Portugal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
