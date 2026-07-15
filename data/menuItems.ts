import { MenuItem } from "@/types";

// ─────────────────────────────────────────────────────────────
// MOCK MENU DATA
// Swap this array with a real fetch from your API/CMS, e.g.:
//
//   export async function getMenuItems(): Promise<MenuItem[]> {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
//       next: { revalidate: 60 }, // ISR: refresh every 60s
//     });
//     return res.json();
//   }
//
// and call it from a Server Component, then pass the result down
// to <MenuSection items={items} />. The shape below is the
// contract the rest of the app expects — keep it stable.
//
// imageURL: replace with real food photography (1:1 or 4:3 works
// best in the card grid). Using Unsplash placeholders for now.
// ─────────────────────────────────────────────────────────────

export const menuItems: MenuItem[] = [
  {
    id: "b-01",
    name: "Poha & Chai",
    description: "Flattened rice tempered with mustard seeds, curry leaves, and peanuts, served with cutting chai.",
    price: 89,
    category: "Breakfast",
    imageURL: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop",
    isPure: true,
  },
  {
    id: "b-02",
    name: "Methi Thepla Pack",
    description: "Fenugreek flatbreads rolled thin and pan-toasted, paired with raw mango pickle.",
    price: 99,
    category: "Breakfast",
    imageURL: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "b-03",
    name: "Idli Sambar",
    description: "Steamed rice cakes, coconut chutney, and slow-simmered sambar with fresh drumstick.",
    price: 109,
    category: "Breakfast",
    imageURL: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
    isBestseller: true,
  },
  {
    id: "l-01",
    name: "Maharashtrian Thali",
    description: "Varan-bhaat, bhaji of the day, koshimbir, chapati, papad, and a spoon of pure ghee.",
    price: 179,
    category: "Lunch",
    imageURL: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop",
    isBestseller: true,
    isPure: true,
  },
  {
    id: "l-02",
    name: "Rajma Chawal Bowl",
    description: "Slow-cooked kidney beans in a home-style tomato gravy over steamed basmati rice.",
    price: 149,
    category: "Lunch",
    imageURL: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "l-03",
    name: "Paneer Butter Masala + Roti",
    description: "Cottage cheese simmered in a mildly sweet tomato-cashew gravy with two soft rotis.",
    price: 189,
    category: "Lunch",
    imageURL: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "d-01",
    name: "Dal Tadka & Jeera Rice",
    description: "Yellow lentils finished with a ghee-cumin tadka, served with fragrant jeera rice.",
    price: 159,
    category: "Dinner",
    imageURL: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=800&auto=format&fit=crop",
    isPure: true,
  },
  {
    id: "d-02",
    name: "Kolhapuri Veg Sukka + Bhakri",
    description: "A fiery Kolhapuri-style mixed vegetable sukka with warm jowar bhakri.",
    price: 179,
    category: "Dinner",
    imageURL: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "d-03",
    name: "Curd Rice & Fryums",
    description: "Cooling curd rice tempered with mustard and curry leaves, with crisp fryums on the side.",
    price: 119,
    category: "Dinner",
    imageURL: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "t-01",
    name: "Daily Veg Tiffin",
    description: "2 sabzi, dal, 4 chapati, rice, salad — the everyday home lunch, delivered fresh.",
    price: 139,
    category: "Tiffins",
    imageURL: "https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=800&auto=format&fit=crop",
    isBestseller: true,
    isPure: true,
  },
  {
    id: "t-02",
    name: "Monthly Tiffin Subscription",
    description: "26 lunches across the month, rotating menu, pause anytime from your account.",
    price: 3299,
    category: "Tiffins",
    imageURL: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "t-03",
    name: "Weekly Tiffin Subscription",
    description: "6 lunches, Monday to Saturday, a rotating home-style menu each week.",
    price: 799,
    category: "Tiffins",
    imageURL: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop",
  },
];

export const CATEGORIES: MenuItem["category"][] = ["Breakfast", "Lunch", "Dinner", "Tiffins"];
