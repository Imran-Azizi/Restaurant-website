export type GalleryItem = {
  id: string;
  title: string;
  alt: string;
  src: string;
  /** Illustrative placeholder until real restaurant photography arrives */
  illustrative: true;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Oven-fresh crust",
    alt: "Illustrative pizza crust close-up",
    src: "/images/hero-pizza.jpg",
    illustrative: true,
  },
  {
    id: "g2",
    title: "Margherita moment",
    alt: "Illustrative margherita pizza",
    src: "/images/pizza-margherita.jpg",
    illustrative: true,
  },
  {
    id: "g3",
    title: "Pepperoni feast",
    alt: "Illustrative pepperoni pizza",
    src: "/images/pizza-pepperoni.jpg",
    illustrative: true,
  },
  {
    id: "g4",
    title: "Signature pie",
    alt: "Illustrative signature pizza",
    src: "/images/pizza-signature.jpg",
    illustrative: true,
  },
  {
    id: "g5",
    title: "Garden olive",
    alt: "Illustrative vegetarian pizza",
    src: "/images/pizza-veggie.jpg",
    illustrative: true,
  },
  {
    id: "g6",
    title: "Spicy heat",
    alt: "Illustrative spicy pizza",
    src: "/images/pizza-spicy.jpg",
    illustrative: true,
  },
];
