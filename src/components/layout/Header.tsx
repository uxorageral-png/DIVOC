import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages } from '@/lib/i18n';
import { CartDrawer } from './CartDrawer';
import { cn } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const feminineSubLinks = [
    { href: '/products/feminine/hoodies', label: t.nav.hoodies },
    { href: '/products/feminine/tshirts', label: t.nav.tshirts },
  ];
  const masculineSubLinks = [
    { href: '/products/masculine/hoodies', label: t.nav.hoodies },
    { href: '/products/masculine/tshirts', label: t.nav.tshirts },
  ];
  const shoesLink = { href: '/products/shoes', label: t.nav.shoes };

  const isProductsActive = location.pathname.startsWith('/products');

  // Centered desktop links (with dropdown rendered inline for "Produits")
  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const active = location.pathname === href;
    return (
      <Link
        to={href}
        className={cn(
          'relative text-[11px] font-normal tracking-[0.18em] uppercase transition-colors py-2',
          active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {label}
        {active && (
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-px w-4 bg-foreground" />
        )}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center h-16 lg:h-[76px] gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-[20px] lg:text-[22px] font-semibold tracking-[0.32em] text-foreground hover:opacity-70 transition-opacity"
            >
              DIVOC
            </Link>
          </div>

          {/* Centered Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-12 justify-center">
            <NavLink href="/" label={t.nav.home} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    'relative inline-flex items-center gap-1 bg-transparent text-[11px] font-normal tracking-[0.18em] uppercase transition-colors focus:outline-none py-2',
                    isProductsActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {t.nav.products}
                  <ChevronDown className="h-3 w-3" />
                  {isProductsActive && (
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-px w-4 bg-foreground" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-card border-border w-56">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/products">{t.nav.allProducts}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t.nav.feminine}
                </DropdownMenuLabel>
                {feminineSubLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild className="cursor-pointer">
                    <Link to={link.href} className="pl-4">{link.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t.nav.masculine}
                </DropdownMenuLabel>
                {masculineSubLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild className="cursor-pointer">
                    <Link to={link.href} className="pl-4">{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/about" label={t.nav.about} />
            <NavLink href="/contact" label={t.nav.contact} />
            <NavLink href="/faq" label={t.nav.faq} />
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 lg:gap-2 justify-end">
            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 px-2 gap-1.5 text-muted-foreground hover:text-foreground">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline text-[11px] font-medium uppercase tracking-wider">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${language === lang.code ? 'text-[hsl(38_65%_42%)]' : ''}`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                  <User className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  <span className="sr-only">{t.nav.account}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <a href="https://divoc-identity-2ev3w.myshopify.com/account/login" target="_blank" rel="noopener noreferrer">
                    {t.nav.login}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <a href="https://divoc-identity-2ev3w.myshopify.com/account/register" target="_blank" rel="noopener noreferrer">
                    {t.nav.register}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <a href="https://divoc-identity-2ev3w.myshopify.com/account" target="_blank" rel="noopener noreferrer">
                    {t.nav.myAccount}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search (placeholder) */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex h-9 w-9 text-muted-foreground hover:text-foreground"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </Button>

            {/* Cart */}
            <CartDrawer />

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md bg-background border-border">
                <div className="flex flex-col h-full pt-8">
                  <nav className="flex flex-col gap-1">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-xl font-medium tracking-wide py-2.5 transition-colors',
                        location.pathname === '/' ? 'text-[hsl(38_65%_42%)]' : 'text-foreground hover:text-[hsl(38_65%_42%)]'
                      )}
                    >
                      {t.nav.home}
                    </Link>

                    <div>
                      <button
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className={cn(
                          'flex items-center justify-between w-full text-xl font-medium tracking-wide py-2.5 transition-colors',
                          isProductsActive ? 'text-[hsl(38_65%_42%)]' : 'text-foreground'
                        )}
                      >
                        {t.nav.products}
                        <ChevronDown className={cn('h-5 w-5 transition-transform', mobileProductsOpen && 'rotate-180')} />
                      </button>
                      {mobileProductsOpen && (
                        <div className="pl-4 flex flex-col gap-1 mt-1">
                          <Link to="/products" onClick={() => setIsOpen(false)} className="text-base text-muted-foreground hover:text-foreground py-2">
                            {t.nav.allProducts}
                          </Link>
                          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 mt-3 mb-1">{t.nav.feminine}</p>
                          {feminineSubLinks.map((l) => (
                            <Link key={l.href} to={l.href} onClick={() => setIsOpen(false)} className="text-base text-muted-foreground hover:text-foreground py-1.5 pl-2">
                              {l.label}
                            </Link>
                          ))}
                          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 mt-3 mb-1">{t.nav.masculine}</p>
                          {masculineSubLinks.map((l) => (
                            <Link key={l.href} to={l.href} onClick={() => setIsOpen(false)} className="text-base text-muted-foreground hover:text-foreground py-1.5 pl-2">
                              {l.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {[
                      { href: '/about', label: t.nav.about },
                      { href: '/contact', label: t.nav.contact },
                      { href: '/faq', label: t.nav.faq },
                    ].map((l) => (
                      <Link
                        key={l.href}
                        to={l.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'text-xl font-medium tracking-wide py-2.5 transition-colors',
                          location.pathname === l.href ? 'text-[hsl(38_65%_42%)]' : 'text-foreground hover:text-[hsl(38_65%_42%)]'
                        )}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
