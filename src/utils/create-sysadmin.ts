import UserModel from "../models/User";
import bcrypt from "bcrypt";

export default async function createSysAdmin() {
  let user = await UserModel.findOne({
    username: process.env.SYS_ADMIN_USERNAME,
    role: "sysadmin",
  });
  if (!user) {
    user = new UserModel({
      username: process.env.SYS_ADMIN_USERNAME,
      password: await bcrypt.hash(process.env.SYS_ADMIN_PASSWORD, 12),
      role: "sysadmin",
      customer: null,
      organization: null,
    });
    await user.save();
    user.createdBy = user._id;
    await user.save();
  }
}
