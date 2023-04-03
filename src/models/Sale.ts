import mongoose, { Schema, Document } from "mongoose";

export interface Product {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  discount?: number;
}

export interface ISale extends Document {
  order?: mongoose.Types.ObjectId;
  customer?: mongoose.Types.ObjectId;
  saleDate: Date;
  products: Product[];
  totalPrice: number;
  createdBy: mongoose.Types.ObjectId;
  organization: mongoose.Types.ObjectId;
}

const saleSchema: Schema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    saleDate: {
      type: Date,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        discount: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model<ISale>("Sale", saleSchema);

export default Sale;
