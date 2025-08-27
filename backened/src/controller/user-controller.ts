import { Request, Response } from "express";
import User from "../model/User-model";

export const staticToken =
  "dfldflkjslakjflsjdlkfjlaksdjflkdsjlkfjsfjlksadjlkfjsa";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (user.password === password) {
      res.status(200).json({ staticToken });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
