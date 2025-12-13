export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Hyper Cleaning Supplies",
  image: "https://www.hypercleaningsupplies.co.nz/logo.png",
  description: "Professional cleaning supplies and materials for commercial and residential use",
  url: "https://www.hypercleaningsupplies.co.nz",
  telephone: "+64 22 069 2139",
  email: "contact@hypercleaningsupplies.co.nz",
  address: {
    "@type": "PostalAddress",
    addressCountry: "NZ",
    addressLocality: "New Zealand",
  },
  sameAs: [
    "https://www.facebook.com/hypercleaningsupplies",
    "https://www.instagram.com/hypercleaningsupplies",
  ],
  priceRange: "$$",
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What cleaning products do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer professional-grade cleaning supplies including chemicals, bathroom care, kitchen care, floor care, dispensers, gloves, and paper products.",
      },
    },
    {
      "@type": "Question",
      name: "Do you deliver to New Zealand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we deliver throughout New Zealand. Check our shipping policy for details.",
      },
    },
    {
      "@type": "Question",
      name: "What payment methods do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We accept all major credit cards, debit cards, and digital payment methods through Stripe.",
      },
    },
  ],
};

export const generateProductSchema = (product: any, siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  image: [product.srcUrl, ...(product.gallery ?? [])],
  description: product.description || `Professional cleaning product: ${product.title}`,
  brand: {
    "@type": "Brand",
    name: "Hyper Cleaning Supplies",
  },
  offers: {
    "@type": "Offer",
    url: `${siteUrl}/shop/product/${product.id}`,
    priceCurrency: "NZD",
    price: product.price,
    availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
  },
  aggregateRating: product.rating > 0 ? {
    "@type": "AggregateRating",
    ratingValue: product.rating,
    reviewCount: 1,
  } : undefined,
});
