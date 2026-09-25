import { createContext, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  const setLang = (l) => {
    i18n.changeLanguage(l);
    localStorage.setItem('ui_lang', l);
  };

  useEffect(() => {
    const stored = localStorage.getItem('ui_lang');
    if (stored && stored !== i18n.language) {
      i18n.changeLanguage(stored);
    }
  }, [i18n]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
