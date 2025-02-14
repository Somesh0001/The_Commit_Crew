import { NextResponse } from "next/server";
import { generateAuthenticationOptions } from "@simplewebauthn/server";


const SAMPLE_CREDENTIAL_ID = "BASE64URL_ENCODED_CREDENTIAL_ID";

export async function GET() {
  try {
    const rpID = process.env.NEXT_PUBLIC_RP_ID || "localhost";

    const options = generateAuthenticationOptions({
      rpID,

      allowCredentials: [
        {
          id: Buffer.from(SAMPLE_CREDENTIAL_ID, "base64url"),
          type: "public-key",
          transports: ["internal"], // Adjust based on your use case (e.g., 'usb', 'ble', 'nfc')
        },
      ],
      userVerification: "preferred", // or "required" if needed
    });

    return NextResponse.json(options, { status: 200 });
  } catch (error) {
    console.error("Error generating authentication options:", error);
    return NextResponse.json(
      { error: "Failed to generate authentication options" },
      { status: 500 }
    );
  }
}
