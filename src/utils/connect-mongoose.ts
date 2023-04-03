import mongoose from "mongoose";

export default async function connectMongoose() {
  return mongoose.connect(process.env.MONGO_URI);
}
