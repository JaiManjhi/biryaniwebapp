import mongoose, { Schema, type Document } from 'mongoose';

/* ═══════════════════════════════════════════════════════
   Review Model — Customer reviews for menu items
   ═══════════════════════════════════════════════════════ */

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  menuItemId: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  approved: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5'],
    },
    title: { type: String, trim: true, maxlength: 200 },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
      maxlength: 1000,
    },
    images: [{ type: String }],
    approved: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

reviewSchema.index({ menuItemId: 1 });
reviewSchema.index({ userId: 1 });
reviewSchema.index({ approved: 1 });

export default mongoose.models.Review ||
  mongoose.model<IReview>('Review', reviewSchema);
