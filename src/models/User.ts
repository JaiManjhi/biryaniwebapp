import mongoose, { Schema, type Document } from 'mongoose';

/* ═══════════════════════════════════════════════════════
   User Model — Customer accounts
   
   Indexes: email (unique), phone
   Password is hashed before save (handled in auth routes)
   ═══════════════════════════════════════════════════════ */

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  addresses: Array<{
    label: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  }>;
  favorites: mongoose.Types.ObjectId[];
  role: 'customer';
  loyaltyPoints: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema(
  {
    label: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must be less than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\d{10,15}$/, 'Please provide a valid phone number'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Never return password by default
    },
    avatar: { type: String },
    addresses: [addressSchema],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
    role: {
      type: String,
      enum: ['customer'],
      default: 'customer',
    },
    loyaltyPoints: { type: Number, default: 0, min: 0 },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        const obj = ret as Record<string, unknown>;
        delete obj.password;
        delete obj.__v;
        return obj;
      },
    },
  }
);

/* Indexes */
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 });

export default mongoose.models.User ||
  mongoose.model<IUser>('User', userSchema);
