import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  username: string;
  password: string;
  role: "admin" | "cashier" | "sysadmin";
  customer?: Schema.Types.ObjectId;
  createdBy?: Schema.Types.ObjectId;
  organization?: Schema.Types.ObjectId;
}

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "cashier", "sysadmin"],
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: 1, organization: 1 }, { unique: true });

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
