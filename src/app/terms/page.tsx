import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use stub for Zaitoon Pizza.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 prose-zaitoon">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
        Terms of Use
      </h1>
      <p className="mt-6 text-[var(--color-muted)] leading-relaxed">
        This is a placeholder terms page. Before launch, add terms covering menu
        accuracy, sample pricing, ordering via WhatsApp/API, and liability for delivery
        when that service is offered.
      </p>
      <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
        Sample menu items and offers on this website are illustrative until confirmed
        by Zaitoon Pizza Restaurant.
      </p>
    </div>
  );
}
