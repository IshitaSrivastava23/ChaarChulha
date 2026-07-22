import { CartLine, CustomerDetails, OrderTotals } from "@/types";

export interface HistoricalOrder {
  orderId: string;
  placedAt: number; // timestamp
  customer: CustomerDetails;
  items: CartLine[];
  totals: OrderTotals;
  status: string; // E.g. "Awaiting Confirmation"
}

const STORAGE_KEY = "chaarchulha_recent_orders";
const MAX_ORDERS = 20;

export const OrderHistoryService = {
  /**
   * Saves a new order to the browser's local storage.
   * Maintains a maximum of 20 orders, dropping the oldest if exceeded.
   */
  saveOrder: (order: HistoricalOrder): void => {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;

      const existingOrders = OrderHistoryService.getRecentOrders();
      
      // Add new order to the front
      const updatedOrders = [order, ...existingOrders];
      
      // Truncate to MAX_ORDERS
      if (updatedOrders.length > MAX_ORDERS) {
        updatedOrders.length = MAX_ORDERS;
      }

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    } catch (error) {
      console.warn("Failed to save order history. LocalStorage might be disabled.", error);
    }
  },

  /**
   * Retrieves the list of recent orders from local storage.
   */
  getRecentOrders: (): HistoricalOrder[] => {
    try {
      if (typeof window === "undefined" || !window.localStorage) return [];

      const data = window.localStorage.getItem(STORAGE_KEY);
      if (!data) return [];

      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed as HistoricalOrder[];
      }
      return [];
    } catch (error) {
      console.warn("Failed to parse order history. Clearing invalid data.", error);
      OrderHistoryService.clearHistory();
      return [];
    }
  },

  /**
   * Clears the order history from local storage.
   */
  clearHistory: (): void => {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear order history.", error);
    }
  }
};
