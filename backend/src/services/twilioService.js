import 'dotenv/config';
import twilio from 'twilio';
const { VoiceResponse } = twilio.twiml;

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function makePhoneCall(phoneNumber, eventTitle, eventTime) {
  console.log(phoneNumber, eventTitle, eventTime,'phoneNumber, eventTitle, eventTime');
  

  const vr = new VoiceResponse();
  vr.say(
    { voice: 'alice' },
    `Hello! This is a reminder from your Calendar app. 
     You have an upcoming event: ${eventTitle}, 
     scheduled for ${eventTime}. 
     Please prepare accordingly. Thank you!`
  );
  const twimlMessage = vr.toString();

  try {
    const call = await client.calls.create({
      to:`+91${phoneNumber}`,                
      from: process.env.TWILIO_PHONE_NUMBER,
      twiml: twimlMessage,                        
    });
    return call;
  } catch (err) {
    console.error('Error making phone call:', err);
    throw err;
  }
}
