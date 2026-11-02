import type { Metadata } from "next";
import { GallerySection } from "@/components/sections/GallerySection";

export const metadata: Metadata = {
  title: "Atmosphere",
  description:
    "Browse every dish from the Zaitoon Pizza menu — tap a photo to open the full item page.",
};

export default function GalleryPage() {
  return <GallerySection />;
}
