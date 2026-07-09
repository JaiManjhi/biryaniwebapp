import mongoose, { Schema, type Document } from 'mongoose';

/* ═══════════════════════════════════════════════════════
   Reservation Model
   
   Status: Pending → Confirmed → Completed / Cancelled
   Duplicate detection: same customer + date + time
   ═══════════════════════════════════════════════════════ */

export interface IReservation extends Document {
  customerId?: mongoose.Types.ObjectId;
  customerName: string;
  phone: string;
  email: string;
  date: Date;
  time: string;
  guestCount: number;
  specialRequest?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  tableNumber?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reservationSchema = new Schema<IReservation>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    date: { type: Date, required: [true, 'Date is required'] },
    time: { type: String, required: [true, 'Time is required'] },
    guestCount: {
      type: Number,
      required: [true, 'Guest count is required'],
      min: [1, 'At least 1 guest required'],
      max: [20, 'Maximum 20 guests per booking'],
    },
    specialRequest: { type: String, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    tableNumber: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

reservationSchema.index({ date: 1, time: 1 });
reservationSchema.index({ customerId: 1 });
reservationSchema.index({ status: 1 });
reservationSchema.index({ email: 1, date: 1, time: 1 });

export default mongoose.models.Reservation ||
  mongoose.model<IReservation>('Reservation', reservationSchema);
