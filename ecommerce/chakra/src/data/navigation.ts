export type NavLink = {
  label: string;
  href: string;
};

export const announcement = {
  message: "Sign up and get 20% off to your first order.",
  action: { label: "Sign Up Now", href: "/signup" },
};

export const shopCategories: NavLink[] = [
  { label: "Casual", href: "/shop/casual" },
  { label: "Formal", href: "/shop/formal" },
  { label: "Party", href: "/shop/party" },
  { label: "Gym", href: "/shop/gym" },
];

export const primaryLinks: NavLink[] = [
  { label: "On Sale", href: "/sale" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Brands", href: "/brands" },
];
