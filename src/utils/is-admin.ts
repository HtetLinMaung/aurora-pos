import User from "../models/User";

export default async function isAdmin(userId: string) {
  const user = await User.findById(userId);

  if (user.role !== "admin") {
    return false;
  }
  return true;
}
