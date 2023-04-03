import mongoose, { Document, Model, Schema } from "mongoose";

interface IProduct extends Document {
  name: string;
  description?: string;
  sku: string;
  price: number;
  stock: number;
  categories?: string[];
  images?: string[];
  variants?: {
    name: string;
    sku: string;
    price: number;
    stock: number;
    images?: string[];
  }[];
  createdBy: mongoose.Types.ObjectId;
  organization: mongoose.Types.ObjectId;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    categories: {
      type: [String],
    },
    images: {
      type: [String],
    },
    variants: {
      type: [
        {
          name: String,
          sku: String,
          price: Number,
          stock: Number,
          images: [String],
        },
      ],
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

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
