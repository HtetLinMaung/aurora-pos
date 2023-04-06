import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../../models/User";

export default brewBlankExpressFunc(async (req, res) => {
  // Get username and password from request body
  const { username, password, rememberMe } = req.body;

  // Check if user with given username exists in database
  const user = await User.findOne({ username });
  if (!user) {
    throwErrorResponse(401, "Invalid username!");
  }

  // Check if password matches hashed password in database
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throwErrorResponse(401, "Invalid password!");
  }

  // Set the JWT expiration time based on the rememberMe parameter
  const expiresIn = rememberMe ? "7d" : process.env.JWT_EXPIRES_IN;

  // Create and sign JWT token
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn,
    }
  );

  // Send token back to client
  res.json({
    code: 200,
    message: "Login successful",
    data: { token },
  });
});
