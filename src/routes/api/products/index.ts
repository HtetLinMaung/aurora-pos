import {
  brewExpressFuncCreateOrFindAll,
  throwErrorResponse,
} from "code-alchemy";
import Product from "../../../models/Product";
import isAdmin from "../../../utils/is-admin";
import isAuth from "../../../utils/is-auth";

export default brewExpressFuncCreateOrFindAll(
  Product,
  {
    afterFunctionStart: async (req) => {
      isAuth(req);
      const ok = await isAdmin(req.body.createdBy);
      if (!ok) {
        throwErrorResponse(401, "You are not an admin");
      }
    },
  },
  "mongoose"
);
