export const hero = {
  title: "Find clothes that matches your style",
  description:
    "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
  action: { label: "Shop Now", href: "/shop" },
  image: {
    src: "/images/hero-couple.jpg",
    alt: "A couple in matching black denim jackets and white hoodies",
  },
  stats: [
    { value: "200+", label: "International Brands" },
    { value: "2,000+", label: "High-Quality Products" },
    { value: "30,000+", label: "Happy Customers" },
  ],
};

export type Brand = {
  name: string;
  logo: string;
};

export const brands: Brand[] = [
  { name: "Versace", logo: "/brands/versace.svg" },
  { name: "Zara", logo: "/brands/zara.svg" },
  { name: "Gucci", logo: "/brands/gucci.svg" },
  { name: "Prada", logo: "/brands/prada.svg" },
  { name: "Calvin Klein", logo: "/brands/calvin-klein.svg" },
];

export type DressStyle = {
  name: string;
  href: string;
  image: string;
  span: "narrow" | "wide";
};

export const dressStyles: DressStyle[] = [
  { name: "Casual", href: "/shop/casual", image: "/images/styles/casual.jpg", span: "narrow" },
  { name: "Formal", href: "/shop/formal", image: "/images/styles/formal.jpg", span: "wide" },
  { name: "Party", href: "/shop/party", image: "/images/styles/party.jpg", span: "wide" },
  { name: "Gym", href: "/shop/gym", image: "/images/styles/gym.jpg", span: "narrow" },
];

export type Testimonial = {
  id: string;
  name: string;
  rating: number;
  quote: string;
  verified: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "t-001",
    name: "Sarah M.",
    rating: 5,
    quote:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    verified: true,
  },
  {
    id: "t-002",
    name: "Alex K.",
    rating: 5,
    quote:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    verified: true,
  },
  {
    id: "t-003",
    name: "James L.",
    rating: 5,
    quote:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    verified: true,
  },
  {
    id: "t-004",
    name: "Mooen",
    rating: 5,
    quote:
      "Ordering was quick, the sizes were exactly as listed and the fabric feels better than the photos suggest. Shop.co is now my first stop for everyday basics.",
    verified: true,
  },
  {
    id: "t-005",
    name: "Priya S.",
    rating: 4.5,
    quote:
      "Great fits and honest prices. Returns were painless when I needed a different size, and the replacement arrived in two days.",
    verified: true,
  },
];
