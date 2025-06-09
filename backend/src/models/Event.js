import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: String,  
  title: String,
  startTime: Date,
  endTime: Date,
  reminderSent: { type: Boolean, default: false },
});


const Event = mongoose.model('Events', eventSchema);

export default Event;
