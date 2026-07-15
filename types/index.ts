// ─────────────────────────────────────────────────────────────
// Core domain types. Keep these in sync with your real API/DB
// schema once you swap out the mock data in /data/menuItems.ts
// ─────────────────────────────────────────────────────────────

export type MenuCategory = "Breakfast" | "Lunch" | "Dinner" | "Tiffins";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in INR, whole rupees
  category: MenuCategory;
  imageURL: string;
  isPure?: boolean; // e.g. "no onion/garlic", "pure veg" style badges
  isBestseller?: boolean;
}

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface OrderTotals {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  grandTotal: number;
}
