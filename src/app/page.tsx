import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Footer } from "@/components/sections/footer";
import { LazyScrollProgress } from "@/components/lazy-scroll-progress";
import { LazyChat } from "@/components/lazy-chat";
import { siteConfig } from "@/lib/site";

const Features = dynamic(
  () => import("@/components/sections/features").then((m) => m.Features),
  { loading: () => <div className="min-h-[720px]" aria-hidden /> }
);
const Showcase = dynamic(
  () => import("@/components/sections/showcase").then((m) => m.Showcase),
  { loading: () => <div className="min-h-[640px]" aria-hidden /> }
);
const Specs = dynamic(
  () => import("@/components/sections/specs").then((m) => m.Specs),
  { loading: () => <div className="min-h-[520px]" aria-hidden /> }
);
const Testimonials = dynamic(
  () => import("@/components/sections/testimonials").then((m) => m.Testimonials),
  { loading: () => <div className="min-h-[400px]" aria-hidden /> }
);
const Newsletter = dynamic(
  () => import("@/components/sections/newsletter").then((m) => m.Newsletter),
  { loading: () => <div className="min-h-[480px]" aria-hidden /> }
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.brand,
      url: siteConfig.url,
      logo: `${siteConfig.url}/apple-icon`,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address,
        addressCountry: "VN",
      },
    },
    {
      "@type": "Product",
      name: siteConfig.name,
      description: siteConfig.description,
      brand: { "@type": "Brand", name: siteConfig.brand },
      image: `${siteConfig.url}/images/helix-hero.webp`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "50000",
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        priceCurrency: "VND",
        price: "9990000",
        url: `${siteConfig.url}/#newsletter`,
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LazyScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Showcase />
        <Specs />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <LazyChat />
    </>
  );
}
