import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2"; // Use only twitter-api-v2
// import dotenv from "dotenv";

// // Load environment variables (assuming you're using .env.local in Next.js)
// dotenv.config();

// Twitter API credentials from environment variables

// const client = new TwitterApi({
//   apiKey: process.env.TWITTER_API_KEY || "",
//   appSecret: process.env.TWITTER_API_SECRET_KEY,
//   accessToken: process.env.TWITTER_ACCESS_TOKEN,
//   accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });

// const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN || "");

// const publicClient = createPublicClient({
//     chain: baseSepolia,
//     transport: http(),
//   });

export async function POST(req: NextRequest) {
  console.log("hello to test");
  // if (req.method === "POST") {

  const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN || "");

  const { twitterHandle, message, transactionHash } = await req.json();

  try {
    // If there's a transactionHash, handle it with Web3 logic
    // if (transactionHash) {
    // Use publicClient to get transaction details
    // const txDetails = await publicClient.getTransaction(transactionHash);

    // if (!txDetails) {
    //   return res.status(404).json({ error: "Transaction not found." });
    // }

    const web3Message = "hello";

    // Send Twitter notification based on Web3 event using twitter-api-v2
    await client.v2.tweet(`@${twitterHandle} ${web3Message}`);

    return NextResponse.json({
      status: 200,
      message: "Notification sent successfully based on Web3 event.",
    });
    // } else {
    //     // Send a regular Twitter notification if no transactionHash is provided
    //     await client.v2.tweet(`@${twitterHandle} ${message}`);

    //     res.status(200).json({ message: "Notification sent successfully." });
    //   }
  } catch (error) {
    console.error("Error sending Twitter notification:", error);
    return NextResponse.json({
      status: 500,
      error: "Error sending Twitter notification.",
    });
  }
  // } else {
  //   res.status(405).json({ error: "Method not allowed. Use POST." });
  // }
}
