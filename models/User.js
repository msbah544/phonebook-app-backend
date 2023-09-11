import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  //validate client input
  if (!email || !password) {
    throw Error("All input fields must be filled");
  }
  //validate email & password

  if (!validator.isEmail(email)) {
    throw Error("A valid email is required");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("A strong password is required");
  }

  //check if user exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("User already exists");
  }

  //encrypt password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //create user
  const user = await this.create({ email, password: hash });

  if (!user) {
    throw Error("faliure: User not created");
  }

  return user;
};

const User = model("user", userSchema);

export default User;
