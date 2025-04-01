// import rateLimit from "next-rate-limit";
// import mailchimp from "@mailchimp/mailchimp_marketing";
// import crypto from "crypto";
// import { NextApiRequest, NextApiResponse } from "next";

// const limiter = rateLimit({
//   interval: 60 * 1000, // 1 minute
//   uniqueTokenPerInterval: 500,
// });

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await limiter.check(req, 5, "CACHE_TOKEN"); // 5 requests per minute
//   } catch {
//     return res.json({ message: "Too many requests" }, { status: 429 });
//   }

//   // continue to handle Mailchimp logic

//   mailchimp.setConfig({
//     apiKey: process.env.MAILCHIMP_API_KEY!,
//     server: process.env.MAILCHIMP_SERVER_PREFIX!,
//   });

//   const getEmailHash = (email: string) =>
//     crypto.createHash("md5").update(email.toLowerCase()).digest("hex");

//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { email } = req.body;
//   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     return res.status(400).json({ message: "Invalid email" });
//   }

//   const emailHash = getEmailHash(email);

//   try {
//     const member = await mailchimp.lists.getListMember(
//       process.env.MAILCHIMP_LIST_ID!,
//       emailHash
//     );

//     if (member.status === "subscribed") {
//       return res.status(200).json({ message: "Email already subscribed" });
//     }
//   } catch (err: any) {
//     // If not found, Mailchimp throws an error — that's OK!
//     if (err.status !== 404) {
//       return res.status(500).json({ message: "Error checking subscription" });
//     }
//   }

//   try {
//     await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
//       email_address: email,
//       status: "subscribed",
//     });

//     return res.status(200).json({ message: "Successfully subscribed" });
//   } catch (error: any) {
//     return res
//       .status(500)
//       .json({ message: error.message || "Subscription failed" });
//   }
// }
