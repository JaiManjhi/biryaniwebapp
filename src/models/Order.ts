import mongoose, { Schema, type Document } from 'mongoose';

/* ═══════════════════════════════════════════════════════
   Order Model — Customer orders
   
   Status flow: Pending → Preparing → Ready → Delivered → Completed
   Payment: Cash | Card | UPI
   ═══════════════════════════════════════════════════════ */

export interface IOrderItem {
  menuItemId: mongoose.Types.ObjectId;
  name: string;
  image: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;
  orderNumber: string;
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: 'cash' | 'card' | 'upi';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'preparing' | 'ready' | 'delivered' | 'completed' | 'cancelled';
  deliveryType: 'dine-in' | 'takeaway' | 'delivery';
  address?: string;
  estimatedTime?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema(
  {
    menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name: { type: String, required: true },
    image: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    subtotal: { type: Number, required: true, min: 0 },
  },
  { _id: true }
);

/* Generate unique order number */
function generateOrderNumber(): string {
  const prefix = 'STB';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

const orderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer is required'],
    },
    orderNumber: {
      type: String,
      unique: true,
      default: generateOrderNumber,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (val: IOrderItem[]) => val.length > 0,
        message: 'Order must have at least one item',
      },
    },
    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    deliveryCharge: { type: Number, default: 0, min: 0 },
    grandTotal: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'upi'],
      default: 'cash',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'preparing', 'ready', 'delivered', 'completed', 'cancelled'],
      default: 'pending',
    },
    deliveryType: {
      type: String,
      enum: ['dine-in', 'takeaway', 'delivery'],
      default: 'dine-in',
    },
    address: { type: String },
    estimatedTime: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

orderSchema.index({ customerId: 1 });
orderSchema.index({ orderNumber: 1 }, { unique: true });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ createdAt: -1 });

export default mongoose.models.Order ||
  mongoose.model<IOrder>('Order', orderSchema);
