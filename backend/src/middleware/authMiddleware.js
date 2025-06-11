import axios from "axios";
import User from "../models/User.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = await User.findOne({ googleId: data?.id });
    req.user = userData;
    next();
  } catch (error) {
    console.error(
      "Invalid Google token:",
      error?.response?.data || error.message
    );
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
