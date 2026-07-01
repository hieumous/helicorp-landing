"use client";

import { cn } from "@/lib/utils";
import { locales, localeLabels, type Locale } from "@/lib/i18n/translations";
import { useTranslations } from "@/hooks/use-translations";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useTranslations();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border/60 bg-muted/50 p-0.5",
        className
      )}
      role="group"
      aria-label={t.lang.switch}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code as Locale)}
          aria-pressed={locale === code}
          aria-label={code === "vi" ? t.lang.vi : t.lang.en}
          className={cn(
            "min-w-[2.25rem] rounded-md px-2 py-1 text-xs font-semibold transition-colors",
            locale === code
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {localeLabels[code as Locale]}
        </button>
      ))}
    </div>
  );
}
