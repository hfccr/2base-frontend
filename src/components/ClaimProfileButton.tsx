import { useWriteContract } from "wagmi";
import Registry from "@/util/Registry.json";
import Addresses from "@/util/Addresses.json";
import { parseEther } from "viem";
import { Button, Typography } from "@mui/material";
import toast from "react-hot-toast";

interface ClaimProfileButtonProps {
  disabled: boolean;
  provider: number;
  profile: string;
}

export default function ClaimProfileButton({
  disabled,
  provider,
  profile,
}: ClaimProfileButtonProps) {
  const { isPending, isSuccess, isError, writeContract } = useWriteContract();
  const delegate = () => {
    writeContract({
      abi: Registry.abi,
      address: Addresses.Registry as `0x${string}`,
      functionName: "claim",
      args: [{ provider, id: profile }],
    });
    toast((t) => <Typography>Claiming Profile @{profile}</Typography>);
  };
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={delegate}
      disabled={disabled}
    >
      Claim Profile
    </Button>
  );
}
