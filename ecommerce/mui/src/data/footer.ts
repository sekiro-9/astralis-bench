import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon } from "@/components/icons";
import type { NavLink } from "./navigation";

export const footerIntro =
  "We have clothes that suits your style and which you're proud to wear. From women to men.";

export const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "GitHub", href: "https://github.com", icon: GithubIcon },
];

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Features", href: "/features" },
      { label: "Works", href: "/works" },
      { label: "Career", href: "/careers" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Customer Support", href: "/support" },
      { label: "Delivery Details", href: "/delivery" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { label: "Account", href: "/faq/account" },
      { label: "Manage Deliveries", href: "/faq/deliveries" },
      { label: "Orders", href: "/faq/orders" },
      { label: "Payments", href: "/faq/payments" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free eBooks", href: "/resources/ebooks" },
      { label: "Development Tutorial", href: "/resources/tutorials" },
      { label: "How to - Blog", href: "/blog" },
      { label: "Youtube Playlist", href: "/resources/videos" },
    ],
  },
];

export const paymentMethods = [
  { name: "Visa", logo: "/payments/visa.svg" },
  { name: "Mastercard", logo: "/payments/mastercard.svg" },
  { name: "PayPal", logo: "/payments/paypal.svg" },
  { name: "Apple Pay", logo: "/payments/apple-pay.svg" },
  { name: "Google Pay", logo: "/payments/google-pay.svg" },
];

export const copyright = "Shop.co © 2000-2026, All Rights Reserved";
