/* ═══════════════════════════════════════════════════════
   TypeScript Types — Reservations
   ═══════════════════════════════════════════════════════ */

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled';

export interface Reservation {
  _id: string;
  customerId?: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guestCount: number;
  specialRequest?: string;
  status: ReservationStatus;
  tableNumber?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationFormData {
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guestCount: number;
  specialRequest?: string;
}
