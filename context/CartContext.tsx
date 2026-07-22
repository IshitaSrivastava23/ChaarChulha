"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";
import { CartLine, MenuItem, OrderTotals } from "@/types";
import { calculateTotals } from "@/lib/pricing";

// ─────────────────────────────────────────────────────────────
// CART STATE — single source of truth for the cart.
// Any component can read/mutate the cart via useCart(), no prop
// drilling required. This is the ONLY place cart mutation logic
// should live; UI components just dispatch actions.
// ─────────────────────────────────────────────────────────────

interface CartState {
  lines: CartLine[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isHistoryOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; item: MenuItem }
  | { type: "REMOVE_ITEM"; itemId: string }
  | { type: "INCREMENT"; itemId: string }
  | { type: "DECREMENT"; itemId: string }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "OPEN_CHECKOUT" }
  | { type: "CLOSE_CHECKOUT" }
  | { type: "OPEN_HISTORY" }
  | { type: "CLOSE_HISTORY" };

const initialState: CartState = {
  lines: [],
  isCartOpen: false,
  isCheckoutOpen: false,
  isHistoryOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.lines.find((l) => l.item.id === action.item.id);
      const lines = existing
        ? state.lines.map((l) => (l.item.id === action.item.id ? { ...l, quantity: l.quantity + 1 } : l))
        : [...state.lines, { item: action.item, quantity: 1 }];
      return { ...state, lines, isCartOpen: true };
    }
    case "REMOVE_ITEM": {
      return { ...state, lines: state.lines.filter((l) => l.item.id !== action.itemId) };
    }
    case "INCREMENT": {
      const lines = state.lines.map((l) => (l.item.id === action.itemId ? { ...l, quantity: l.quantity + 1 } : l));
      return { ...state, lines };
    }
    case "DECREMENT": {
      const lines = state.lines
        .map((l) => (l.item.id === action.itemId ? { ...l, quantity: l.quantity - 1 } : l))
        .filter((l) => l.quantity > 0);
      return { ...state, lines };
    }
    case "CLEAR_CART":
      return { ...state, lines: [] };
    case "OPEN_CART":
      return { ...state, isCartOpen: true, isHistoryOpen: false };
    case "CLOSE_CART":
      return { ...state, isCartOpen: false };
    case "OPEN_CHECKOUT":
      return { ...state, isCartOpen: false, isCheckoutOpen: true, isHistoryOpen: false };
    case "CLOSE_CHECKOUT":
      return { ...state, isCheckoutOpen: false };
    case "OPEN_HISTORY":
      return { ...state, isHistoryOpen: true, isCartOpen: false };
    case "CLOSE_HISTORY":
      return { ...state, isHistoryOpen: false };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isHistoryOpen: boolean;
  itemCount: number;
  totals: OrderTotals;
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  increment: (itemId: string) => void;
  decrement: (itemId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  openHistory: () => void;
  closeHistory: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.lines.reduce((sum, l) => sum + l.quantity, 0);
    const totals = calculateTotals(state.lines);

    return {
      lines: state.lines,
      isCartOpen: state.isCartOpen,
      isCheckoutOpen: state.isCheckoutOpen,
      isHistoryOpen: state.isHistoryOpen,
      itemCount,
      totals,
      addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
      removeItem: (itemId) => dispatch({ type: "REMOVE_ITEM", itemId }),
      increment: (itemId) => dispatch({ type: "INCREMENT", itemId }),
      decrement: (itemId) => dispatch({ type: "DECREMENT", itemId }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      openCart: () => dispatch({ type: "OPEN_CART" }),
      closeCart: () => dispatch({ type: "CLOSE_CART" }),
      openCheckout: () => dispatch({ type: "OPEN_CHECKOUT" }),
      closeCheckout: () => dispatch({ type: "CLOSE_CHECKOUT" }),
      openHistory: () => dispatch({ type: "OPEN_HISTORY" }),
      closeHistory: () => dispatch({ type: "CLOSE_HISTORY" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
