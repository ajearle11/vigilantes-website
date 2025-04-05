import rateLimit from "next-rate-limit";
import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(req: NextRequest) {
  try {
    await limiter.checkNext(req, 5); // ✅ Add `await` here
  } catch {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const email = (body.email || "").trim().toLowerCase();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!email || !isValidEmail) {
    return NextResponse.json(
      { message: "Invalid email", body: email },
      { status: 400 }
    );
  }

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY!,
    server: process.env.MAILCHIMP_SERVER_PREFIX!,
  });

  const emailHash = crypto.createHash("md5").update(email).digest("hex");

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
    if (
      err &&
      typeof err === "object" &&
      "status" in err &&
      (err as { status: number }).status !== 404
    ) {
      return NextResponse.json(
        { message: "Error checking subscription" },
        { status: 500 }
      );
    }
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
      email_address: email,
      status: "subscribed",
    });

    return NextResponse.json(
      { message: "Successfully subscribed" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Mailchimp subscription error:", error);

    let errorMessage = "Subscription failed";

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string"
    ) {
      errorMessage = (error as { message: string }).message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
