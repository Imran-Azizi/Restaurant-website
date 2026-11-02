import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Zaitoon Pizza in Kabul — phone, WhatsApp, or message form.",
};

export default function ContactPage() {
  return <ContactSection asPage />;
}
