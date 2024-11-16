require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authtoken = req.header("Authorization");
    if (!authtoken) {
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided" });
    }
    const token = authtoken.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET); // Use your JWT secret key
    const user = await User.findOne({ _id: decoded._id });

    req.user = user; // Attach the user payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: "Invalid Token. Please Authenticate." });
  }
};

module.exports = { auth };
