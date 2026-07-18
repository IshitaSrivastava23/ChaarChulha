import { notFound } from "next/navigation";
import { menuItems, CATEGORIES } from "@/data/menuItems";

// Required for GitHub Pages static export
export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category,
  }));
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = decodeURIComponent(params.category);
  const isValidCategory = CATEGORIES.includes(
    category as (typeof CATEGORIES)[number]
  );

  if (!isValidCategory) {
    notFound();
  }

  const items = menuItems.filter((item) => item.category === category);

  return (
    <main className="min-h-screen bg-cream-50 px-6 py-24 text-charcoal-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-semibold">{category}</h1>
        <p className="mt-3 font-body text-charcoal-700">
          Showing {items.length} dishes from this category.
        </p>
      </div>
    </main>
  );
}