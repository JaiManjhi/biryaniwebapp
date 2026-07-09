/* ═══════════════════════════════════════════════════════
   TypeScript Types — Orders
   ═══════════════════════════════════════════════════════ */

export type PaymentMethod = 'cash' | 'card' | 'upi';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type OrderStatus =
  | 'pending'
  | 'preparing'
  | 'ready'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export type DeliveryType = 'dine-in' | 'takeaway' | 'delivery';

export type PlateSize = 'full' | 'half';

export interface OrderItem {
  _id: string;
  menuItemId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  subtotal: number;
  plateSize?: PlateSize;
}

export interface Order {
  _id: string;
  customerId: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  deliveryType: DeliveryType;
  address?: string;
  estimatedTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  veg: boolean;
  plateSize: PlateSize;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}
