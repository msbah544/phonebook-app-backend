const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  //verify token
  try {
  } catch (error) {}
};
