import Factory from "@/util/Factory.json"; // Import your ABI
import Addresses from "../util/Addresses.json";
import { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { Box, Chip, Tooltip } from "@mui/material";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

export default function Points() {
  // Fetch points from the contract
  const { address, isConnected } = useAccount();
  const { data: pointsData, isFetched } = useReadContract({
    abi: Factory.abi,
    address: Addresses.Factory as Address,
    functionName: "getPoints",
    args: [address],
  });
  const points = pointsData ? Number(pointsData) : 0; // Convert to number for rendering
  return (
    <>
      {isConnected && (
        <Box sx={{ ml: 1, position: "fixed", bottom: 100, right: 32 }}>
          {isFetched && points > 0 && (
            <Tooltip title={`You have ${points} points`}>
              <Chip label={`${points}`} avatar={<LoyaltyIcon />}></Chip>
            </Tooltip>
          )}
        </Box>
      )}
    </>
  );
}
