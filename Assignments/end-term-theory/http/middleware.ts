import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, token is missing",
      success: false,
    });
  }

  try {
    const { userId, role } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    req.userId = userId;
    req.role = role;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, token is missing",
      success: false,
    });
  }
};
