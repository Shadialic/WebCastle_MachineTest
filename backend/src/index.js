import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cookieParser from "cookie-parser";
import cors from "cors";

import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import { connectToDB } from "./config/db.js";
import './services/cronJob.js'; 

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

connectToDB();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
      scope: [
        "profile",
        "email",
        "https://www.googleapis.com/auth/calendar.readonly",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            picture: profile.photos[0].value,
            accessToken,
            refreshToken,
          });
        } else {
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/user", homeRoutes);
app.use("/event", eventRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the backend API");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
