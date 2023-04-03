import { log } from "starless-logger";
import connectMongoose from "./utils/connect-mongoose";
import createSysAdmin from "./utils/create-sysadmin";

export const afterMasterProcessStart = async () => {
  await connectMongoose();
  log("Connected to MongoDB");
  await createSysAdmin();
};
