import User from "../models/User.js";

export const userSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    if (user) {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(400).json({ message: `faliure: ${error.message}` });
  }
};
