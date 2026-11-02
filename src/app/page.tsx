import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Hero } from "@/components/sections/Hero";
import { OrbitMenuShowcase } from "@/components/sections/OrbitMenuShowcase";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Zaitoon Pizza | Fresh pizza in Kabul",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <OrbitMenuShowcase />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
