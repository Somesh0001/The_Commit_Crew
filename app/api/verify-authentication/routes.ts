import { NextResponse } from "next/server";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Retrieve the saved challenge from your session or database.
    // For demonstration, we're using a placeholder value.
    const expectedChallenge = "THE_CHALLENGE_YOU_SAVED"; // Replace with your stored challenge

    // Retrieve the user's authenticator data (public key, credential ID, counter) from your DB.
    // Replace these sample values with the actual values from your database.
    const userAuthenticator = {
      credentialPublicKey: Buffer.from("BASE64_ENCODED_PUBLIC_KEY", "base64"),
      credentialID: Buffer.from("BASE64URL_ENCODED_CREDENTIAL_ID", "base64"),
      counter: 0, // This should be the last known counter value
    };

    const rpID = process.env.NEXT_PUBLIC_RP_ID || "localhost";
    const expectedOrigin = process.env.NEXT_PUBLIC_EXPECTED_ORIGIN || "http://localhost:3000";

    const verification = await verifyAuthenticationResponse(body, {
      expectedChallenge,
      expectedOrigin,
      expectedRPID: rpID,
      authenticator: userAuthenticator,
    });

    if (verification.verified) {
      // Optionally, update the authenticator's counter in your database.
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error verifying authentication response:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
