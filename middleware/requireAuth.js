import jwt from "jsonwebtoken";
import Contact from "../models/Contact.js";

const requireAuth = async (req, res, next) => {
  //verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    //verify token
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    //attach user id to request object
    req.user = Contact.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Request is not authorized" });
  }
};

export default requireAuth;
