"use client";

import { useEffect } from "react";
import { useLocaleStore } from "@/store/locale-store";
import { getTranslations } from "@/lib/i18n/translations";
import { siteConfig } from "@/lib/site";

export function LocaleSync() {
  const locale = useLocaleStore((s) => s.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    const t = getTranslations(locale);
    document.title = `${siteConfig.name} — ${t.site.tagline}`;
  }, [locale]);

  return null;
}
