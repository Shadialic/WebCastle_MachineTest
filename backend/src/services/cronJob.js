import cron from 'node-cron';
import { checkUpcomingEvents } from './eventReminder.js';

cron.schedule('* * * * *', async () => {
  console.log("⏰ Running cron to check upcoming calendar events...");
  await checkUpcomingEvents();
});
