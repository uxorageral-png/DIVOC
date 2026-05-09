import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribed successfully!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-secondary/40 border-t border-border">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-24">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">Newsletter</span>
          <h3 className="mt-3 text-2xl lg:text-3xl font-bold tracking-tight mb-3 text-foreground">
            {t.footer.newsletter.title}
          </h3>
          <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder={t.footer.newsletter.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-full px-5"
              required
            />
            <Button 
              type="submit" 
              className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide rounded-full"
            >
              {t.footer.newsletter.button}
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <Link to="/" className="text-2xl font-bold tracking-wider text-foreground">
                DIVOC
              </Link>
              <p className="mt-4 text-muted-foreground text-sm max-w-xs">
                Streetwear with roots. Power in every piece.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/size-guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.nav.sizeGuide || 'Size Guide'}
                  </Link>
                </li>
                <li>
                  <Link to="/lookbook" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.nav.lookbook || 'Lookbook'}
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.legal.shipping}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.legal.privacy}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.legal.terms}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t.footer.social}</h4>
              <a 
                href="https://www.instagram.com/divoc.luxury?igsh=Zjl4cmtkeDFocGt1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                @divoc.luxury
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
