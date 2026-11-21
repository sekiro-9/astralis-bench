export type Product = {
  id: string;
  slug: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  originalPrice?: number;
};

export const products: Product[] = [
  {
    id: "p-001",
    slug: "t-shirt-with-tape-details",
    name: "T-shirt with Tape Details",
    image: "/images/products/t-shirt-tape-details.jpg",
    rating: 4.5,
    price: 120,
  },
  {
    id: "p-002",
    slug: "skinny-fit-jeans",
    name: "Skinny Fit Jeans",
    image: "/images/products/skinny-fit-jeans.jpg",
    rating: 3.5,
    price: 240,
    originalPrice: 260,
  },
  {
    id: "p-003",
    slug: "checkered-shirt",
    name: "Checkered Shirt",
    image: "/images/products/checkered-shirt.jpg",
    rating: 4.5,
    price: 180,
  },
  {
    id: "p-004",
    slug: "sleeve-striped-t-shirt",
    name: "Sleeve Striped T-shirt",
    image: "/images/products/sleeve-striped-t-shirt.jpg",
    rating: 4.5,
    price: 130,
    originalPrice: 160,
  },
  {
    id: "p-005",
    slug: "vertical-striped-shirt",
    name: "Vertical Striped Shirt",
    image: "/images/products/vertical-striped-shirt.jpg",
    rating: 5,
    price: 212,
    originalPrice: 232,
  },
  {
    id: "p-006",
    slug: "courage-graphic-t-shirt",
    name: "Courage Graphic T-shirt",
    image: "/images/products/courage-graphic-t-shirt.jpg",
    rating: 4,
    price: 145,
  },
  {
    id: "p-007",
    slug: "loose-fit-bermuda-shorts",
    name: "Loose Fit Bermuda Shorts",
    image: "/images/products/loose-fit-bermuda-shorts.jpg",
    rating: 3,
    price: 80,
  },
  {
    id: "p-008",
    slug: "faded-skinny-jeans",
    name: "Faded Skinny Jeans",
    image: "/images/products/faded-skinny-jeans.jpg",
    rating: 4.5,
    price: 210,
  },
];

const byId = (ids: string[]) => ids.map((id) => products.find((product) => product.id === id)!);

export const newArrivals = byId(["p-001", "p-002", "p-003", "p-004"]);
export const topSelling = byId(["p-005", "p-006", "p-007", "p-008"]);
