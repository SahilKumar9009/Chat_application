import User from "../model/User-model";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User({
      username,
      email,
      passwordHash: password,
    });

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
