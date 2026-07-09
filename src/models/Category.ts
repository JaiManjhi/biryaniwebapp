import mongoose, { Schema, type Document } from 'mongoose';

/* ═══════════════════════════════════════════════════════
   Category Model — Menu categories
   ═══════════════════════════════════════════════════════ */

export interface ICategory extends Document {
  name: string;
  slug: string;
  image?: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: { type: String },
    description: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ sortOrder: 1 });

export default mongoose.models.Category ||
  mongoose.model<ICategory>('Category', categorySchema);
