/* ═══════════════════════════════════════════════════════
   TypeScript Types — Menu & Categories
   ═══════════════════════════════════════════════════════ */

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface MenuItem {
  _id: string;
  categoryId: string;
  category?: Category;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  veg: boolean;
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  rating: number;
  reviewCount: number;
  ingredients: string[];
  nutrition?: NutritionInfo;
  image: string;
  gallery: string[];
  available: boolean;
  featured: boolean;
  preparationTime: string;
  createdAt: string;
  updatedAt: string;
}

export type SpiceLevel = 1 | 2 | 3 | 4 | 5;

export type MenuSortOption =
  | 'newest'
  | 'price-low'
  | 'price-high'
  | 'popular'
  | 'rating';

export interface MenuFilters {
  category?: string;
  veg?: boolean;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  spiceLevel?: SpiceLevel;
  available?: boolean;
  featured?: boolean;
  search?: string;
  sort?: MenuSortOption;
  page?: number;
  limit?: number;
}
