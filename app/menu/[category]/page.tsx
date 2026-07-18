// import { notFound } from "next/navigation";
// import { menuItems, CATEGORIES } from "@/data/menuItems";
// import { MenuCard } from "@/components/MenuCard";

// // // Required for GitHub Pages static export
// // export async function generateStaticParams() {
// //   return CATEGORIES.map((category) => ({
// //     category,
// //   }));
// // }

// export default function CategoryPage({
//   params,
// }: {
//   params: { category: string };
// }) {
//     console.log("Category from URL:", params.category);
//     console.log("Valid categories:", CATEGORIES);
//   const category = decodeURIComponent(params.category);
//   const isValidCategory = CATEGORIES.includes(
//     category as (typeof CATEGORIES)[number]
//   );

//   if (!isValidCategory) {
//     notFound();
//   }

//   const items = menuItems.filter((item) => item.category === category);

//   return (
//     <main className="min-h-screen bg-cream-50 px-6 py-24 text-charcoal-900">
//       <div className="mx-auto max-w-5xl">
//         <h1 className="font-display text-3xl font-semibold">{category}</h1>
//         <p className="mt-3 font-body text-charcoal-700">
//             {items.length} dishes available
//         </p>

//         <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {items.map((item) => (
//                 <MenuCard key={item.id} item={item} />
//             ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// // export default function CategoryPage({
// //   params,
// // }: {
// //   params: { category: string };
// // }) {
// //   return (
// //     <div style={{ padding: 50 }}>
// //       <h1>IT WORKS!</h1>
// //       <p>{params.category}</p>
// //     </div>
// //   );
// // }

import { menuItems } from "@/data/menuItems";
import { MenuCard } from "@/components/MenuCard";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = decodeURIComponent(params.category);

  console.log("Category from URL:", category);

  const items = menuItems.filter((item) => item.category === category);

  return (
    <main className="min-h-screen bg-cream-50 px-6 py-24 text-charcoal-900">
      <div className="mx-auto max-w-5xl">
        <h1>{category}</h1>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}