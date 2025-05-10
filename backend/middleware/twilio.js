import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendOTP = async (to, otp) => {
  return await client.messages.create({
    body: `Your OTP code is ${otp}`,
    from: phoneNumber,
    to: to
  });
};
