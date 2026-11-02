import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy stub for Zaitoon Pizza.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 prose-zaitoon">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
        Privacy Policy
      </h1>
      <p className="mt-6 text-[var(--color-muted)] leading-relaxed">
        This is a placeholder privacy policy. Before launch, replace this page with a
        policy reviewed for Afghanistan data-protection expectations covering contact
        forms, order details, analytics (if any), and WhatsApp handoffs.
      </p>
      <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
        Contact information submitted through this site should only be used to respond
        to inquiries or fulfill orders. Do not sell personal data.
      </p>
    </div>
  );
}
