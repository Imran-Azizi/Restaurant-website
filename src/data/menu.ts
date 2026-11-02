export type MenuSize = {
  id: string;
  label: string;
  price: number;
};

export type MenuItem = {
  id: string;
  slug: string;
  name: string;
  nameDari?: string;
  namePashto?: string;
  description: string;
  category: MenuCategoryId;
  ingredients: string[];
  sizes: MenuSize[];
  image: string;
  featured?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  isSample: true;
};

export type MenuCategoryId =
  | "signature"
  | "classics"
  | "chicken"
  | "veggie"
  | "sides"
  | "drinks";

export type MenuCategory = {
  id: MenuCategoryId;
  name: string;
  description: string;
};

export const menuCategories: MenuCategory[] = [
  {
    id: "signature",
    name: "Signature",
    description: "House favorites built for sharing.",
  },
  {
    id: "classics",
    name: "Classics",
    description: "Familiar pies, generous toppings.",
  },
  {
    id: "chicken",
    name: "Chicken",
    description: "Savory chicken-forward pizzas.",
  },
  {
    id: "veggie",
    name: "Vegetarian",
    description: "Garden-fresh without the meat.",
  },
  {
    id: "sides",
    name: "Sides",
    description: "Crisp bites beside the pizza.",
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Cold refreshers for the table.",
  },
];

/** SAMPLE MENU — prices and items are illustrative until confirmed. */
export const menuItems: MenuItem[] = [
  {
    id: "margherita",
    slug: "margherita",
    name: "Margherita",
    nameDari: "مارگریتا",
    namePashto: "مارګریتا",
    description:
      "San Marzano-style tomato, fresh mozzarella, basil, and olive oil on a blistered crust.",
    category: "signature",
    ingredients: ["Tomato", "Mozzarella", "Basil", "Olive oil"],
    sizes: [
      { id: "s", label: "Small", price: 280 },
      { id: "m", label: "Medium", price: 420 },
      { id: "l", label: "Large", price: 560 },
    ],
    image: "/images/pizza-margherita.jpg",
    featured: true,
    vegetarian: true,
    isSample: true,
  },
  {
    id: "zaitoon-special",
    slug: "zaitoon-special",
    name: "Zaitoon Special",
    nameDari: "زیتون اسپشیال",
    namePashto: "زیتون ځانګړی",
    description:
      "Our namesake pie — olives, roasted peppers, beef, mozzarella, and a touch of oregano.",
    category: "signature",
    ingredients: ["Olives", "Peppers", "Beef", "Mozzarella", "Oregano"],
    sizes: [
      { id: "s", label: "Small", price: 350 },
      { id: "m", label: "Medium", price: 520 },
      { id: "l", label: "Large", price: 680 },
    ],
    image: "/images/pizza-signature.jpg",
    featured: true,
    isSample: true,
  },
  {
    id: "pepperoni-feast",
    slug: "pepperoni-feast",
    name: "Pepperoni Feast",
    description: "Loaded pepperoni, melted mozzarella, and a rich tomato base.",
    category: "classics",
    ingredients: ["Pepperoni", "Mozzarella", "Tomato sauce"],
    sizes: [
      { id: "s", label: "Small", price: 320 },
      { id: "m", label: "Medium", price: 480 },
      { id: "l", label: "Large", price: 640 },
    ],
    image: "/images/pizza-pepperoni.jpg",
    featured: true,
    isSample: true,
  },
  {
    id: "four-cheese",
    slug: "four-cheese",
    name: "Four Cheese",
    description: "Mozzarella, cheddar, feta, and parmesan — creamy and golden.",
    category: "classics",
    ingredients: ["Mozzarella", "Cheddar", "Feta", "Parmesan"],
    sizes: [
      { id: "s", label: "Small", price: 340 },
      { id: "m", label: "Medium", price: 500 },
      { id: "l", label: "Large", price: 660 },
    ],
    image: "/images/pizza-four-cheese.jpg",
    vegetarian: true,
    isSample: true,
  },
  {
    id: "bbq-chicken",
    slug: "bbq-chicken",
    name: "BBQ Chicken",
    description: "Smoky BBQ sauce, grilled chicken, red onion, and coriander.",
    category: "chicken",
    ingredients: ["Chicken", "BBQ sauce", "Onion", "Coriander"],
    sizes: [
      { id: "s", label: "Small", price: 360 },
      { id: "m", label: "Medium", price: 540 },
      { id: "l", label: "Large", price: 700 },
    ],
    image: "/images/pizza-bbq-chicken.jpg",
    featured: true,
    isSample: true,
  },
  {
    id: "spicy-chicken",
    slug: "spicy-chicken",
    name: "Spicy Chicken",
    description: "Chili heat, tender chicken, jalapeños, and mozzarella.",
    category: "chicken",
    ingredients: ["Chicken", "Jalapeño", "Chili", "Mozzarella"],
    sizes: [
      { id: "s", label: "Small", price: 360 },
      { id: "m", label: "Medium", price: 540 },
      { id: "l", label: "Large", price: 700 },
    ],
    image: "/images/pizza-spicy.jpg",
    spicy: true,
    isSample: true,
  },
  {
    id: "garden-olive",
    slug: "garden-olive",
    name: "Garden Olive",
    description: "Mushrooms, olives, peppers, onion, and tomato on a light sauce.",
    category: "veggie",
    ingredients: ["Mushroom", "Olive", "Pepper", "Onion", "Tomato"],
    sizes: [
      { id: "s", label: "Small", price: 300 },
      { id: "m", label: "Medium", price: 450 },
      { id: "l", label: "Large", price: 590 },
    ],
    image: "/images/pizza-veggie.jpg",
    vegetarian: true,
    isSample: true,
  },
  {
    id: "mushroom-delight",
    slug: "mushroom-delight",
    name: "Mushroom Delight",
    description: "Earthy mushrooms, garlic oil, mozzarella, and parsley.",
    category: "veggie",
    ingredients: ["Mushroom", "Garlic", "Mozzarella", "Parsley"],
    sizes: [
      { id: "s", label: "Small", price: 310 },
      { id: "m", label: "Medium", price: 460 },
      { id: "l", label: "Large", price: 600 },
    ],
    image: "/images/pizza-mushroom.jpg",
    vegetarian: true,
    isSample: true,
  },
  {
    id: "garlic-bread",
    slug: "garlic-bread",
    name: "Garlic Bread",
    description: "Toasted bread with garlic butter and herbs.",
    category: "sides",
    ingredients: ["Bread", "Garlic", "Butter", "Herbs"],
    sizes: [{ id: "std", label: "Standard", price: 120 }],
    image: "/images/side-garlic.jpg",
    vegetarian: true,
    isSample: true,
  },
  {
    id: "fries",
    slug: "fries",
    name: "Crispy Fries",
    description: "Golden fries, lightly salted.",
    category: "sides",
    ingredients: ["Potato", "Salt"],
    sizes: [{ id: "std", label: "Standard", price: 100 }],
    image: "/images/side-fries.jpg",
    vegetarian: true,
    isSample: true,
  },
  {
    id: "cola",
    slug: "cola",
    name: "Cola",
    description: "Chilled soft drink.",
    category: "drinks",
    ingredients: [],
    sizes: [{ id: "can", label: "Can", price: 50 }],
    image: "/images/drink-cola.jpg",
    isSample: true,
  },
  {
    id: "fresh-lemonade",
    slug: "fresh-lemonade",
    name: "Fresh Lemonade",
    description: "Bright lemon, lightly sweetened.",
    category: "drinks",
    ingredients: ["Lemon", "Sugar", "Water"],
    sizes: [{ id: "glass", label: "Glass", price: 80 }],
    image: "/images/drink-lemonade.jpg",
    vegetarian: true,
    isSample: true,
  },
];

export function getMenuItemBySlug(slug: string): MenuItem | undefined {
  return menuItems.find((item) => item.slug === slug);
}

export function getFeaturedPizzas(): MenuItem[] {
  return menuItems.filter((item) => item.featured);
}

export function getItemsByCategory(category: MenuCategoryId): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export function getLowestPrice(item: MenuItem): number {
  return Math.min(...item.sizes.map((s) => s.price));
}
