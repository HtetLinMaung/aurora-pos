import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrder extends Document {
  orderNumber: string;
  orderNumberSequence: number;
  customerId: string;
  date: Date;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  lineItems: {
    productId: string;
    quantity: number;
    price: number;
    discount: number;
  }[];
  discountPercentage: number;
  createdBy: Schema.Types.ObjectId;
  organization: Schema.Types.ObjectId;
}

const orderSchema: Schema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    orderNumberSequence: {
      type: Number,
      default: 0,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Fulfilled", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    lineItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
        discount: Number,
      },
    ],
    discountPercentage: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
