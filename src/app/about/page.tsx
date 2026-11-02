import type { Metadata } from "next";
import { AboutStory } from "@/components/sections/AboutStory";
import { WhyZaitoon } from "@/components/sections/WhyZaitoon";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
};

export default function AboutPage() {
  return (
    <div className="texture-cream">
      <AboutStory />
      <div
        aria-hidden
        className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-[var(--color-gold)]/45 to-transparent"
      />
      <WhyZaitoon />
    </div>
  );
}
