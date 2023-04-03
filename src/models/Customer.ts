import { Schema, model, Document, Types } from "mongoose";

export interface IAddress extends Document {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface ILoyaltyProgram extends Document {
  points: number;
  rewards: string[];
}

export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: IAddress;
  loyaltyProgram: ILoyaltyProgram;
  orderHistory: Types.ObjectId[];
  createdBy?: Types.ObjectId;
  organization: Schema.Types.ObjectId;
}

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});

const loyaltyProgramSchema = new Schema<ILoyaltyProgram>({
  points: {
    type: Number,
    default: 0,
  },
  rewards: {
    type: [String],
    default: [],
  },
});

const customerSchema = new Schema<ICustomer>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    loyaltyProgram: {
      type: loyaltyProgramSchema,
      required: true,
    },
    orderHistory: {
      type: [Types.ObjectId],
      ref: "Order",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const Customer = model<ICustomer>("Customer", customerSchema);

export default Customer;
