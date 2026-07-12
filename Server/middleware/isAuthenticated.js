import jwt from "jsonwebtoken";
import { Client } from "../schema/client_schema.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies.client || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await Client.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};