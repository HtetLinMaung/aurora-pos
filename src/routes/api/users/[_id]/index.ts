import {
  brewExpressFuncFindOneOrUpdateOrDeleteByParam,
  throwErrorResponse,
} from "code-alchemy";
import UserModel from "../../../../models/User";
import isAdmin from "../../../../utils/is-admin";
import isAuth from "../../../../utils/is-auth";

export default brewExpressFuncFindOneOrUpdateOrDeleteByParam(
  UserModel,
  {
    afterFunctionStart: async (req, res) => {
      isAuth(req);
      const ok = await isAdmin(req.body.createdBy);
      if (!ok) {
        throwErrorResponse(401, "You are not an admin");
      }
    },
  },
  "User not found!",
  "_id",
  "mongoose"
);
