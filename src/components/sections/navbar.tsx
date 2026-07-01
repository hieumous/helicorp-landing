"use client";

import * as React from "react";
import { Menu, X, Watch } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { ShopToolbar } from "@/components/shop/shop-toolbar";
import { cn } from "@/lib/utils";
import { navHrefs } from "@/lib/i18n/translations";
import { siteConfig } from "@/lib/site";
import { useTranslations } from "@/hooks/use-translations";

export function Navbar() {
  const { t } = useTranslations();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 font-heading text-lg font-bold">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Watch className="size-5" />
          </span>
          <span>
            {siteConfig.brand}
            <span className="text-primary">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navHrefs.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ShopToolbar className="hidden sm:flex" />
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="#newsletter"
            className={cn(buttonVariants(), "hidden md:inline-flex")}
            data-track="navbar_preorder"
          >
            {t.nav.preorder}
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="space-y-1 px-4 py-4">
            {navHrefs.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {t.nav[link.key]}
                </a>
              </li>
            ))}
            <li className="flex gap-2 pt-2 sm:hidden">
              <ShopToolbar />
            </li>
            <li className="pt-2">
              <a
                href="#newsletter"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants(), "w-full")}
                data-track="mobile_preorder"
              >
                {t.nav.preorder}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
