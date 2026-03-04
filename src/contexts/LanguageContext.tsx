import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, translations } from '@/lib/i18n';

type TranslationType = (typeof translations)[Language];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
}

const LANGUAGE_CONTEXT_KEY = '__divoc_language_context__';

type GlobalWithLanguageContext = typeof globalThis & {
  [LANGUAGE_CONTEXT_KEY]?: React.Context<LanguageContextType | undefined>;
};

const globalWithLanguageContext = globalThis as GlobalWithLanguageContext;

const LanguageContext =
  globalWithLanguageContext[LANGUAGE_CONTEXT_KEY] ??
  (globalWithLanguageContext[LANGUAGE_CONTEXT_KEY] = createContext<LanguageContextType | undefined>(undefined));

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('divoc-language') as Language;
      if (saved && ['pt', 'en', 'fr'].includes(saved)) {
        return saved;
      }
    }
    return 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('divoc-language', lang);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context) {
    return context;
  }

  if (import.meta.env.DEV) {
    console.warn('useLanguage called without LanguageProvider. Falling back to Portuguese translations.');
  }

  return {
    language: 'pt' as Language,
    setLanguage: () => undefined,
    t: translations.pt,
  };
}

