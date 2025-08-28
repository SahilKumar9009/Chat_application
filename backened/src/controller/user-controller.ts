import { Request, Response } from "express";
import User from "../model/User-model";

export const staticToken =
  "dfldflkjslakjflsjdlkfjlaksdjflkdsjlkfjsfjlksadjlkfjsa";

export const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
};
