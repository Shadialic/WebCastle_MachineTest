import { google } from "googleapis";
import User from "../models/User.js";
import { makePhoneCall } from "../services/twilioService.js";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function checkUpcomingEvents() {
  try {
    const users = await User.find({
      phone: { $exists: true, $ne: null },
      accessToken: { $exists: true },
    });
    for (const user of users) {
      await checkUserEvents(user);
    }
  } catch (error) {
    console.error("Error checking upcoming events:", error.message);
  }
}

async function checkUserEvents(user) {
  try {
    oauth2Client.setCredentials({
      access_token: user.accessToken,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const now = new Date();
    const calendarResponse = await calendar.events.list({
      calendarId: "primary",
      maxResults: 1,
      singleEvents: true,
      orderBy: "startTime",
      timeMin: now.toISOString(),
    });

    const events = calendarResponse.data.items || [];
    for (const event of events) {
      if (event.start && event.start.dateTime) {
        const startEvent = new Date(event.start.dateTime);
        const Diff = startEvent.getTime() - now.getTime();

        if (Diff >= 4 * 60 * 1000 && Diff <= 6 * 60 * 1000) {
          await handleEventReminder(user, event);
        }
      }
    }
  } catch (error) {
    if (error.code === 401 && user.refreshToken) {
      try {
        const { credentials } = await oauth2Client.refreshAccessToken();
        user.accessToken = credentials.access_token;
        if (credentials.refresh_token) {
          user.refreshToken = credentials.refresh_token;
        }
        await user.save();
        await checkUserEvents(user);
      } catch (err) {
        console.log(err);
        
      }
    }
  }
}

async function handleEventReminder(user, event) {
  try {
    const now = new Date();

    if (user.remindedEvents?.includes(event.id)) {
      return;
    }

    const eventTitle = event.summary || "Upcoming Event";
    const eventTime = new Date(event.start.dateTime).toLocaleTimeString();
    await makePhoneCall(user.phone, eventTitle, eventTime);
    user.reminderSent = true;
    user.lastReminderSent = now;
    await user.save();
  } catch (error) {
    console.error(error.message);
  }
}
