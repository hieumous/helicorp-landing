import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Showcase } from "@/components/sections/showcase";
import { Specs } from "@/components/sections/specs";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";
import { Footer } from "@/components/sections/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { ChatWidget } from "@/components/chat/chat-widget";
import { siteConfig } from "@/lib/site";

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
      image: `${siteConfig.url}/images/helix-hero.png`,
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
      <ScrollProgress />
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
      <ChatWidget />
    </>
  );
}
