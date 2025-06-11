import User from "../models/User.js";

export const login = async (req, res) => {
  const { googleId, email, name, image, accessToken, refreshToken } = req.body;
  if (!googleId || !email || !accessToken) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let user = await User.findOne({ googleId });

    if (user) {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken || user.refreshToken;
      await user.save();
    } else {
      user = await User.create({
        googleId,
        email,
        name,
        picture: image,
        accessToken,
        refreshToken,
      });
    }

    return res.status(200).json({ message: "User saved successfully", user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


