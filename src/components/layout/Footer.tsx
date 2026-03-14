import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
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
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl lg:text-3xl font-bold tracking-wide mb-4 text-foreground">
            {t.footer.newsletter.title}
          </h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder={t.footer.newsletter.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground"
              required
            />
            <Button 
              type="submit" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wide"
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

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
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
                <li>
                  <Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.legal.shipping}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t.footer.social}</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/divoc.luxury?igsh=Zjl4cmtkeDFocGt1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
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
