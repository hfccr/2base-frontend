import axios from "axios";
import { ethers } from "ethers";
import { createPublicClient, http } from 'viem';
import { TwitterApi } from "twitter-api-v2"; // Use only twitter-api-v2
import { baseSepolia } from "viem/chains";
// import dotenv from "dotenv";

// // Load environment variables (assuming you're using .env.local in Next.js)
// dotenv.config();

// Twitter API credentials from environment variables
const client = new TwitterApi({
  appKey: "TWITTER_API_KEY",
  appSecret:"TWITTER_API_SECRET_KEY",
  accessToken: "TWITTER_ACCESS_TOKEN",
  accessSecret: "TWITTER_ACCESS_TOKEN_SECRET",
});

const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  export default async function handler(req: any, res: any) {
    if (req.method === "POST") {
      const { twitterHandle, message, transactionHash } = req.body;
  
      try {
        // If there's a transactionHash, handle it with Web3 logic
        if (transactionHash) {
          // Use publicClient to get transaction details
          const txDetails = await publicClient.getTransaction(transactionHash);
  
          if (!txDetails) {
            return res.status(404).json({ error: "Transaction not found." });
          }
  
          const web3Message = `New event detected from wallet ${txDetails.from}: View it here: https://sepolia.etherscan.io/tx/${transactionHash}`;
  
          // Send Twitter notification based on Web3 event using twitter-api-v2
          await client.v1.tweet(`@${twitterHandle} ${web3Message}`);
  
          res.status(200).json({ message: "Notification sent successfully based on Web3 event." });
        } else {
          // Send a regular Twitter notification if no transactionHash is provided
          await client.v1.tweet(`@${twitterHandle} ${message}`);
  
          res.status(200).json({ message: "Notification sent successfully." });
        }
      } catch (error) {
        console.error("Error sending Twitter notification:", error);
        res.status(500).json({ error: "Error sending Twitter notification." });
      }
    } else {
      res.status(405).json({ error: "Method not allowed. Use POST." });
    }
  }