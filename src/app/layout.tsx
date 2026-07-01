import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LazyToaster } from "@/components/lazy-toaster";
import { LocaleSync } from "@/components/locale-sync";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["700"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.brand}`,
  },
  description: siteConfig.description,
  keywords: [
    "smartwatch",
    "đồng hồ thông minh",
    "Helix One",
    "Helicorp",
    "thiết bị đeo thông minh",
    "wearable",
  ],
  authors: [{ name: siteConfig.brand }],
  creator: siteConfig.brand,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          href="/images/helix-hero-mobile.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
          media="(max-width: 1023px)"
        />
        <link
          rel="preload"
          href="/images/helix-hero.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
          media="(min-width: 1024px)"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleSync />
          {children}
          <LazyToaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
