"use client";

import { useLocaleStore } from "@/store/locale-store";
import {
  getTranslations,
  type Locale,
  type Translations,
} from "@/lib/i18n/translations";

export function useTranslations(): {
  t: Translations;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
} {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const toggleLocale = useLocaleStore((s) => s.toggleLocale);

  return {
    t: getTranslations(locale),
    locale,
    setLocale,
    toggleLocale,
  };
}
