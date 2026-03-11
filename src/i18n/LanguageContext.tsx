// src/i18n/LanguageContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Locale, translations } from './translations';

type LanguageContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof translations['es'];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es');
  const t = translations[locale];
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}