import User from "../models/User.js";
import jwt from "jsonwebtoken";

//signup user

const generateToken = (_id) => {
  return jwt.sign({ id: _id }, process.env.JWT_SECRET);
};

export const userSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    if (user) {
      const token = generateToken(user._id);
      return res.status(200).json({ email: user.email, token: token });
    }
  } catch (error) {
    return res.status(400).json({ message: `faliure: ${error.message}` });
  }
};

//login user

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (user) {
      const token = generateToken(user._id);
      return res.status(200).json({ email: user.email, token: token });
    }
  } catch (error) {
    return res.status(400).json({ message: ` faliure: ${error.message}` });
  }
};
