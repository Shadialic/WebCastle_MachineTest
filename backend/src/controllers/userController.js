import { google } from "googleapis";
import User from "../models/User.js";
import Event from "../models/Event.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user data:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const addPhone = async (req, res) => {
  try {
    const userId = req.user.id;
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.phone = phoneNumber;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Phone number added successfully",
      phone: user.phone,
    });
  } catch (error) {
    console.error("Error in addPhone:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventData = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const user = await User.findById(userId);
    if (!user || !user.accessToken) {
      return res
        .status(404)
        .json({ error: "User not found or access token missing" });
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({ access_token: user.accessToken });
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const now = new Date();
    const calendarResponse = await calendar.events.list({
      calendarId: "primary",
      maxResults: 10,
      timeMin: now.toISOString(),
      orderBy: "startTime",
      singleEvents: true,
    });
    const events = calendarResponse.data.items || [];

    const savedEvents = await Promise.all(
      events.map(async (event) => {
        const existing = await Event.findOne({
          eventId: event.id,
          userId,
        });

        if (existing) return existing;

        const newEvent = new Event({
          userId,
          eventId: event.id,
          title: event.summary || "No Title",
          description: event.description || "",
          startTime: event.start?.dateTime || event.start?.date,
          endTime: event.end?.dateTime || event.end?.date,
        });

        return await newEvent.save();
      })
    );

    return res.status(200).json({ events: savedEvents });
  } catch (err) {
    console.error("Error fetching or saving calendar events:", err.message);
    return res.status(500).json({ error: "Failed to fetch and save events" });
  }
};
