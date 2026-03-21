import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages } from '@/lib/i18n';
import { useCartStore } from '@/stores/cartStore';
import { CartDrawer } from './CartDrawer';
import { cn } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const totalItems = useCartStore(state => state.getTotalItems());

  const mainNavLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
    { href: '/faq', label: t.nav.faq },
  ];

  const productSubLinks = [
    { href: '/products', label: t.nav.allProducts },
    { href: '/products/hoodies', label: t.nav.hoodies },
    { href: '/products/tshirts', label: t.nav.tshirts },
  ];

  const currentLang = languages.find(l => l.code === language);
  const isProductsActive = location.pathname.startsWith('/products');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl lg:text-3xl font-bold tracking-wider text-foreground hover:text-primary transition-colors"
          >
            DIVOC
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Home Link */}
            <Link
              to="/"
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {t.nav.home}
            </Link>

            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "inline-flex items-center gap-1 bg-transparent text-sm font-medium tracking-wide transition-colors hover:text-primary focus:outline-none",
                    isProductsActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {t.nav.products}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-card border-border w-48">
                {productSubLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild className="cursor-pointer">
                    <Link
                      to={link.href}
                      className={cn(
                        "w-full",
                        location.pathname === link.href ? 'text-primary bg-accent/50' : ''
                      )}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Other Links */}
            <Link
              to="/about"
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                location.pathname === '/about' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {t.nav.about}
            </Link>
            <Link
              to="/contact"
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                location.pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {t.nav.contact}
            </Link>
            <Link
              to="/faq"
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                location.pathname === '/faq' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {t.nav.faq}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${language === lang.code ? 'text-primary' : ''}`}
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
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <User className="h-5 w-5" />
                  <span className="sr-only">{t.nav.account}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <a 
                    href="https://divoc-identity-2ev3w.myshopify.com/account/login" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {t.nav.login}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <a 
                    href="https://divoc-identity-2ev3w.myshopify.com/account/register" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {t.nav.register}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <a 
                    href="https://divoc-identity-2ev3w.myshopify.com/account" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {t.nav.myAccount}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <CartDrawer />

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md bg-background border-border">
                <div className="flex flex-col h-full pt-8">
                  <nav className="flex flex-col gap-2">
                    {/* Home */}
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-xl font-medium tracking-wide transition-colors hover:text-primary py-2",
                        location.pathname === '/' ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {t.nav.home}
                    </Link>

                    {/* Products with Submenu */}
                    <div>
                      <button
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className={cn(
                          "flex items-center justify-between w-full text-xl font-medium tracking-wide transition-colors hover:text-primary py-2",
                          isProductsActive ? 'text-primary' : 'text-foreground'
                        )}
                      >
                        {t.nav.products}
                        <ChevronDown 
                          className={cn(
                            "h-5 w-5 transition-transform duration-200",
                            mobileProductsOpen ? 'rotate-180' : ''
                          )} 
                        />
                      </button>
                      {mobileProductsOpen && (
                        <div className="pl-4 flex flex-col gap-1 mt-1">
                          {productSubLinks.map((link) => (
                            <Link
                              key={link.href}
                              to={link.href}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileProductsOpen(false);
                              }}
                              className={cn(
                                "text-lg font-medium tracking-wide transition-colors hover:text-primary py-2",
                                location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                              )}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Other Links */}
                    <Link
                      to="/about"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-xl font-medium tracking-wide transition-colors hover:text-primary py-2",
                        location.pathname === '/about' ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {t.nav.about}
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-xl font-medium tracking-wide transition-colors hover:text-primary py-2",
                        location.pathname === '/contact' ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {t.nav.contact}
                    </Link>
                    <Link
                      to="/faq"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-xl font-medium tracking-wide transition-colors hover:text-primary py-2",
                        location.pathname === '/faq' ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {t.nav.faq}
                    </Link>
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
