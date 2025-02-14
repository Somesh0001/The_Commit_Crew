import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);


export const sendSms = async (to: string, message: string) => {
  if (!to || !message) {
    throw new Error("Recipient phone number and message are required");
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: twilioPhone,
      to,
    });

    console.log(`✅ SMS sent successfully to ${to}: ${response.sid}`);
    return { success: true, sid: response.sid };
  } catch (error) {
    console.error("❌ Error sending SMS:", error);
    return { success: false, error };
  }
};
