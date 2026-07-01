"use client";

import { Watch } from "lucide-react";
import { navHrefs } from "@/lib/i18n/translations";
import { siteConfig } from "@/lib/site";
import { useTranslations } from "@/hooks/use-translations";

export function Footer() {
  const { t } = useTranslations();

  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-2 font-heading font-bold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Watch className="size-4" />
          </span>
          {siteConfig.brand}
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navHrefs.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.brand}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
