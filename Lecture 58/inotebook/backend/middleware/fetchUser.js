const jwt = require("jsonwebtoken");
const JWT_SECRET = "jwt-secret";

const fetchUser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "Please authenticate using a valid token",
    });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Please authenticate using a valid token",
    });
  }
};
module.exports = fetchUser;
