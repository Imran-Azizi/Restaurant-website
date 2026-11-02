import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MenuItemDetail } from "@/components/menu/MenuItemDetail";
import { PizzaCard } from "@/components/menu/PizzaCard";
import { RelatedHeading } from "@/components/menu/RelatedHeading";
import {
  getItemsByCategory,
  getMenuItemBySlug,
  menuItems,
} from "@/data/menu";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);
  if (!item) return { title: "Not found" };
  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: `${item.name} | Zaitoon Pizza`,
      description: item.description,
      images: [item.image],
    },
  };
}

export default async function MenuItemPage({ params }: Props) {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);
  if (!item) notFound();

  const related = getItemsByCategory(item.category)
    .filter((i) => i.id !== item.id)
    .slice(0, 3);

  return (
    <div className="section-pad">
      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-[var(--color-charcoal)]/5 shadow-[var(--shadow-card)] sm:aspect-[4/3] lg:aspect-square">
            <Image
              src={item.image}
              alt={item.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              quality={90}
            />
          </div>

          <MenuItemDetail item={item} />
        </div>

        {related.length > 0 ? (
          <div className="mt-20 border-t border-[var(--color-charcoal)]/8 pt-14">
            <RelatedHeading />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <PizzaCard key={r.id} item={r} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
