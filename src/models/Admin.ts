import mongoose, { Schema, type Document } from 'mongoose';

/* ═══════════════════════════════════════════════════════
   Admin Model — Restaurant staff accounts
   
   Roles: manager, admin, superadmin
   Permissions array for granular access control
   ═══════════════════════════════════════════════════════ */

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: 'manager' | 'admin' | 'superadmin';
  permissions: string[];
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['manager', 'admin', 'superadmin'],
      default: 'manager',
    },
    permissions: [{ type: String }],
    lastLogin: { type: Date },
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

adminSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.Admin ||
  mongoose.model<IAdmin>('Admin', adminSchema);
