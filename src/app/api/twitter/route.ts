import { NextRequest, NextResponse } from "next/server";
import { Client, auth } from "twitter-api-sdk";
// import dotenv from "dotenv";

// // Load environment variables (assuming you're using .env.local in Next.js)
// dotenv.config();

// Twitter API credentials from environment variables

const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID as string,
  client_secret: process.env.CLIENT_SECRET as string,
  callback: "YOUR-CALLBACK",
  scopes: ["tweet.read", "users.read", "offline.access"],
});

// const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN || "");

// const publicClient = createPublicClient({
//     chain: baseSepolia,
//     transport: http(),
//   });

export async function POST(req: NextRequest) {
  console.log("hello to test");
  // if (req.method === "POST") {

  const { twitterHandle, message, transactionHash } = await req.json();

  try {
    const client = new Client(authClient);
    const postTweet = await client.tweets.createTweet({
      // The text of the Tweet
      text: "Are you excited for the weekend?",

      // Options for a Tweet with a poll
      poll: {
        options: ["Yes", "Maybe", "No"],
        duration_minutes: 120,
      },
    });
    console.dir(postTweet, {
      depth: null,
    });
    // If there's a transactionHash, handle it with Web3 logic
    // if (transactionHash) {
    // Use publicClient to get transaction details
    // const txDetails = await publicClient.getTransaction(transactionHash);

    // if (!txDetails) {
    //   return res.status(404).json({ error: "Transaction not found." });
    // }


    // Send Twitter notification based on Web3 event using twitter-api-v2

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
