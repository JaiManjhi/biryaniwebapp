/* ═══════════════════════════════════════════════════════
   TypeScript Types — API Response Format
   ═══════════════════════════════════════════════════════ */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: ApiError[];
}

export interface ApiError {
  field?: string;
  message: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalReservations: number;
  pendingOrders: number;
  todayRevenue: number;
  popularItems: Array<{
    menuItemId: string;
    name: string;
    count: number;
  }>;
  recentOrders: Array<{
    _id: string;
    orderNumber: string;
    customerName: string;
    grandTotal: number;
    orderStatus: string;
    createdAt: string;
  }>;
}

export interface Review {
  _id: string;
  userId: string;
  menuItemId: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  approved: boolean;
  createdAt: string;
  userName?: string;
  userAvatar?: string;
}
