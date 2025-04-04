import rateLimit from "next-rate-limit";
import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

// Type guard for Mailchimp error responses
function isMailchimpError(
  err: unknown
): err is { status: number; message?: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    typeof (err as { status?: unknown }).status === "number"
  );
}

// Rate limiter config
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(req: NextRequest) {
  // Rate limiting
  try {
    await limiter.checkNext(req, 5); // 5 requests per minute
  } catch {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  // Parse and validate email
  const body = await req.json();
  const email = (body.email || "").trim().toLowerCase();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!email || !isValidEmail) {
    return NextResponse.json(
      { message: "Invalid email", body: email },
      { status: 400 }
    );
  }

  // Mailchimp config
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY!,
    server: process.env.MAILCHIMP_SERVER_PREFIX!,
  });

  const emailHash = crypto.createHash("md5").update(email).digest("hex");

  // Check if user already subscribed
  try {
    const member = await mailchimp.lists.getListMember(
      process.env.MAILCHIMP_LIST_ID!,
      emailHash
    );

    if (member.status === "subscribed") {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 200 }
      );
    }
  } catch (err: unknown) {
    if (isMailchimpError(err) && err.status !== 404) {
      return NextResponse.json(
        { message: "Error checking subscription" },
        { status: 500 }
      );
    }
    // If 404, continue to subscribe
  }

  // Subscribe user
  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
      email_address: email,
      status: "subscribed",
    });

    return NextResponse.json(
      { message: "Successfully subscribed" },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (isMailchimpError(err) && err.status !== 404) {
      const message =
        typeof err.message === "string" ? err.message : "Subscription failed";

      return NextResponse.json({ message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
