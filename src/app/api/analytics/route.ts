import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb"; // adjust this path if needed
import rateLimit from "next-rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});
export async function POST(req: NextRequest) {
  try {
    await limiter.checkNext(req, 100); 
  } catch {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }
  try {
    const body = await req.json();
    const { download } = body;

    const client = await clientPromise;
    const db = client.db("test");
    const collection =
      process.env.NODE_ENV === "development"
        ? db.collection("dev")
        : db.collection("analytics");

    const result = await collection.updateOne(
      { type: "download_counter" },
      { $inc: { download: download || 1 } },
      { upsert: true }
    );

    return NextResponse.json({ message: "Event logged" }, { status: 200 });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
