import { Button, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";

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
    // writeContract({
    //   abi: //add  abi,
    //   address: // add address address,
    //   functionName: "delegateTo",
    //   args: [provider, id],
    // });
    toast((t) => <Typography>Inviting User {id} To Base</Typography>);
  };
  return (
    <Button variant="outlined" color="secondary" onClick={delegate}>
      Invite
    </Button>
  );
};
