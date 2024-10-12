"use client";
import { createWalletClient, custom } from "viem";
import { baseSepolia } from "viem/chains";
import { useAccount } from "wagmi";
import reclaimAbi from "../../artifacts/Reclaim.json";
import { proofReq } from "../../junk/proofRequest";

export default function Test() {
  const { address: account } = useAccount();
  return (
    <div
      onClick={async () => {
        const walletClient = createWalletClient({
          chain: baseSepolia,
          transport: custom(window.ethereum),
        });
        if (walletClient && account) {
          try {
            const res = walletClient.writeContract({
              abi: reclaimAbi.abi,
              functionName: "verifyProof",
              args: [proofReq],
              address: "0xF90085f5Fd1a3bEb8678623409b3811eCeC5f6A5",
              account,
            });
            console.log({ res });
          } catch (e) {
            console.log({ e });
          }
        }
      }}
    >
      Submit
    </div>
  );
}
