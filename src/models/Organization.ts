import mongoose, { Schema, Document } from "mongoose";

interface Organization extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  createdBy?: Schema.Types.ObjectId;
}

const organizationSchema = new Schema<Organization>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    website: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const OrganizationModel = mongoose.model<Organization>(
  "Organization",
  organizationSchema
);

export default OrganizationModel;
