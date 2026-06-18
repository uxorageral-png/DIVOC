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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages } from '@/lib/i18n';
import { CartDrawer } from './CartDrawer';
import { cn } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenOpen, setMobileMenOpen] = useState(false);
  const [mobileWomenOpen, setMobileWomenOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  // Driven by Shopify collection handles — add more by adding entries here
  // and creating the matching collection in Shopify Admin.
  const menLinks = [
    { href: '/collections/men-hoodies', label: t.nav.hoodies },
    { href: '/collections/men-tshirts', label: t.nav.tshirts },
    { href: '/collections/men-shoes', label: t.nav.shoes },
  ];
  const womenLinks = [
    { href: '/collections/women-hoodies', label: t.nav.hoodies },
    { href: '/collections/women-tshirts', label: t.nav.tshirts },
    { href: '/collections/women-shoes', label: t.nav.shoes },
  ];

  const isMenActive = menLinks.some((l) => location.pathname === l.href);
  const isWomenActive = womenLinks.some((l) => location.pathname === l.href);

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

  const CategoryDropdown = ({
    label,
    active,
    links,
  }: {
    label: string;
    active: boolean;
    links: { href: string; label: string }[];
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'relative inline-flex items-center gap-1 bg-transparent text-[11px] font-normal tracking-[0.18em] uppercase transition-colors focus:outline-none py-2',
            active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {label}
          <ChevronDown className="h-3 w-3" />
          {active && (
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-px w-4 bg-foreground" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={18}
        className="w-56 rounded-none border border-border/60 bg-background shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] p-2"
      >
        {links.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <DropdownMenuItem
              key={link.href}
              asChild
              className="cursor-pointer rounded-none focus:bg-muted/40 data-[highlighted]:bg-muted/40"
            >
              <Link
                to={link.href}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 text-[11px] tracking-[0.18em] uppercase transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span>{link.label}</span>
                {isActive && <span className="h-px w-4 bg-foreground" />}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
            <CategoryDropdown label={t.nav.men} active={isMenActive} links={menLinks} />
            <CategoryDropdown label={t.nav.women} active={isWomenActive} links={womenLinks} />
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

                    <Collapsible open={mobileMenOpen} onOpenChange={setMobileMenOpen}>
                      <CollapsibleTrigger
                        className={cn(
                          'flex items-center justify-between w-full text-xl font-medium tracking-wide py-2.5 transition-colors',
                          isMenActive ? 'text-[hsl(38_65%_42%)]' : 'text-foreground'
                        )}
                      >
                        {t.nav.men}
                        <ChevronDown className={cn('h-5 w-5 transition-transform', mobileMenOpen && 'rotate-180')} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        <div className="pl-4 flex flex-col gap-1 mt-1 pb-2">
                          {menLinks.map((l) => (
                            <Link
                              key={l.href}
                              to={l.href}
                              onClick={() => setIsOpen(false)}
                              className="text-base text-muted-foreground hover:text-foreground py-2 pl-2"
                            >
                              {l.label}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible open={mobileWomenOpen} onOpenChange={setMobileWomenOpen}>
                      <CollapsibleTrigger
                        className={cn(
                          'flex items-center justify-between w-full text-xl font-medium tracking-wide py-2.5 transition-colors',
                          isWomenActive ? 'text-[hsl(38_65%_42%)]' : 'text-foreground'
                        )}
                      >
                        {t.nav.women}
                        <ChevronDown className={cn('h-5 w-5 transition-transform', mobileWomenOpen && 'rotate-180')} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        <div className="pl-4 flex flex-col gap-1 mt-1 pb-2">
                          {womenLinks.map((l) => (
                            <Link
                              key={l.href}
                              to={l.href}
                              onClick={() => setIsOpen(false)}
                              className="text-base text-muted-foreground hover:text-foreground py-2 pl-2"
                            >
                              {l.label}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

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
