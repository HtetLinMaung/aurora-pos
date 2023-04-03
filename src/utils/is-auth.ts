import { throwErrorResponse } from "code-alchemy";
import { Request } from "express";
import jwt from "jsonwebtoken";

export default function isAuth(req: Request) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throwErrorResponse(401, "No token, authorization denied");
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
    if (req.body) {
      req.body.createdBy = decoded.userId;
    } else {
      req.body = {
        createdBy: decoded.userId,
      };
    }

    return decoded;
  } catch (err) {
    console.error(err.message);
    throwErrorResponse(401, err.message);
  }
}
