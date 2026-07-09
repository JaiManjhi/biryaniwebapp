import mongoose, { Schema, type Document } from 'mongoose';

/* ═══════════════════════════════════════════════════════
   MenuItem Model — Individual menu items
   
   Indexes: categoryId, featured, available
   ═══════════════════════════════════════════════════════ */

export interface IMenuItem extends Document {
  categoryId: mongoose.Types.ObjectId;
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
  nutrition?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  image: string;
  gallery: string[];
  available: boolean;
  featured: boolean;
  preparationTime: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative'],
      validate: {
        validator: function (this: IMenuItem, val: number) {
          return !val || val < this.price;
        },
        message: 'Discount price must be less than regular price',
      },
    },
    veg: { type: Boolean, required: true, default: false },
    spiceLevel: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 3,
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    ingredients: [{ type: String, trim: true }],
    nutrition: {
      calories: Number,
      protein: String,
      carbs: String,
      fat: String,
    },
    image: { type: String, required: [true, 'Image is required'] },
    gallery: [{ type: String }],
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    preparationTime: { type: String, default: '30 min' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

menuItemSchema.index({ categoryId: 1 });
menuItemSchema.index({ featured: 1 });
menuItemSchema.index({ available: 1 });
menuItemSchema.index({ veg: 1 });
menuItemSchema.index({ slug: 1 }, { unique: true });
menuItemSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.MenuItem ||
  mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
