import { Button, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";
import Registry from "@/util/Registry.json";
import { parseEther } from "viem";

interface InviteToBaseButtonProps {
  provider: number;
  id: string;
}

export const InviteToBaseButton = ({
  provider,
  id,
}: InviteToBaseButtonProps) => {
  const { writeContract } = useWriteContract();
  const delegate = () => {
    writeContract({
      abi: Registry.abi,
      address: Registry.address as `0x${string}`,
      functionName: "invite",
      args: [{ provider, id }],
      value: parseEther("0.0001"),
    });
    toast((t) => <Typography>Inviting User {id} To Base</Typography>);
  };
  return (
    <Button variant="outlined" color="secondary" onClick={delegate}>
      Invite
    </Button>
  );
};
