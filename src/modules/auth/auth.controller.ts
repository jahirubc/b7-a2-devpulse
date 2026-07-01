import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Signup endpoint is working",
  });
};
