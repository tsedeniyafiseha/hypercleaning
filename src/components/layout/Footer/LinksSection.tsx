import React from "react";
import { FooterLinks } from "./footer.types";
import Link from "next/link";

const footerLinksData: FooterLinks[] = [
  {
    id: 1,
    title: "company",
    children: [
      {
        id: 11,
        label: "About Us",
        url: "/about",
      },
      {
        id: 12,
        label: "Contact",
        url: "/contact",
      },
      {
        id: 13,
        label: "Blog",
        url: "/blog",
      },
    ],
  },
  {
    id: 2,
    title: "help",
    children: [
      {
        id: 21,
        label: "Customer Support",
        url: "/contact",
      },
      {
        id: 22,
        label: "Terms & Conditions",
        url: "/terms",
      },
      {
        id: 23,
        label: "Privacy Policy",
        url: "/privacy",
      },
    ],
  },
  {
    id: 3,
    title: "faq",
    children: [
      {
        id: 31,
        label: "Account",
        url: "/faq#account",
      },
      {
        id: 32,
        label: "Manage Deliveries",
        url: "/faq#deliveries",
      },
      {
        id: 33,
        label: "Orders",
        url: "/faq#orders",
      },
      {
        id: 34,
        label: "Payments",
        url: "/faq#payments",
      },
    ],
  },
  {
    id: 4,
    title: "shop",
    children: [
      {
        id: 41,
        label: "All Products",
        url: "/shop",
      },
      {
        id: 42,
        label: "New Arrivals",
        url: "/shop#new-arrivals",
      },
      {
        id: 43,
        label: "Top Selling",
        url: "/shop#top-selling",
      },
      {
        id: 44,
        label: "Returns",
        url: "/returns",
      },
    ],
  },
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5" key={item.id}>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6">
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className="text-black/60 text-sm md:text-base mb-4 w-fit hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
