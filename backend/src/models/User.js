import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  phone: {
    type: String,
    required: false, 
  },
  reminderSent:{
    type:Boolean,
    default:false,
  },
  lastReminderSent: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
