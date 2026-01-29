/**
 * National Nines Golf API Client
 * Connects to the Spring Boot backend for entries and orders
 */

const API_BASE = import.meta.env.PUBLIC_API_URL || 'https://api.nationalninesgolf.co.uk';

interface EntryData {
  event: string;
  clubName: string;
  player1Name: string;
  player1Email: string;
  player1Handicap: number;
  player2Name: string;
  player2Email: string;
  player2Handicap: number;
  contactPhone: string;
  marketingOptIn: boolean;
}

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface OrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryMethod: 'COLLECTION' | 'SHIPPING';
  shippingAddress?: string;
  shippingCity?: string;
  shippingPostcode?: string;
  notes?: string;
  items: OrderItem[];
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

/**
 * Submit a competition entry
 */
export async function submitEntry(entry: EntryData): Promise<ApiResponse<{ entry: any; checkoutUrl: string }>> {
  try {
    const response = await fetch(`${API_BASE}/api/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.error || 'Failed to submit entry' };
    }

    return { data: await response.json() };
  } catch (error) {
    console.error('Entry submission error:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Create a shop order
 */
export async function createOrder(order: OrderData): Promise<ApiResponse<{ order: any; checkoutUrl: string }>> {
  try {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.error || 'Failed to create order' };
    }

    return { data: await response.json() };
  } catch (error) {
    console.error('Order creation error:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Get entry count for an event
 */
export async function getEntryCount(event: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE}/api/entries/event/${event}/count`);
    if (!response.ok) return 0;
    const data = await response.json();
    return data.count || 0;
  } catch {
    return 0;
  }
}

/**
 * Check order status
 */
export async function getOrderStatus(orderNumber: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE}/api/orders/${orderNumber}/status`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.status;
  } catch {
    return null;
  }
}
