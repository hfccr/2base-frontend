import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";
import Registry from "@/util/Registry.json";
import Addresses from "@/util/Addresses.json";
import { parseEther } from "viem";
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionToast,
  TransactionToastAction,
  TransactionToastIcon,
  TransactionToastLabel,
} from "@coinbase/onchainkit/transaction";
import { encodeFunctionData, Hex } from "viem";
import { hardhat } from "wagmi/chains";
import { getProviderName } from "./InvitedLeaderTable";

interface InviteToBaseButtonProps {
  provider: number;
  id: string;
}

const registryContractAddress: Hex = Addresses.Registry as Hex;
const registryContractAbi = Registry.abi;

export function InviteToBaseOck({ provider, id }: InviteToBaseButtonProps) {
  const [open, setOpen] = useState(false);
  const encodedInviteData = encodeFunctionData({
    abi: registryContractAbi,
    functionName: "invite",
    args: [{ provider, id }],
  });

  const calls = [
    {
      to: registryContractAddress,
      data: encodedInviteData,
      value: parseEther("0.0001"),
    },
  ];
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Invite {getProviderName(provider)} Profile @{id}{" "}
        </DialogTitle>
        <DialogContent>
          <Typography>Send 0.0001 ETH to support @{id}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Box sx={{ width: 250 }}>
            <Transaction
              chainId={hardhat.id}
              calls={calls}
              onStatus={(status) => console.log("Transaction status:", status)}
            >
              <TransactionButton text="Invite" />
              <TransactionSponsor />
              <TransactionToast>
                <TransactionToastIcon />
                <TransactionToastLabel />
                <TransactionToastAction />
              </TransactionToast>
            </Transaction>
          </Box>
        </DialogActions>
      </Dialog>
      <Button variant="outlined" onClick={handleOpen}>
        Invite
      </Button>
    </>
  );
}

export const InviteToBaseButton = ({
  provider,
  id,
}: InviteToBaseButtonProps) => {
  const { isPending, isSuccess, isError, writeContract } = useWriteContract();
  const delegate = () => {
    writeContract({
      abi: Registry.abi,
      address: Addresses.Registry as `0x${string}`,
      functionName: "invite",
      args: [{ provider, id }],
      value: parseEther("0.0001"),
    });
    toast((t) => <Typography>Inviting User {id} To Base</Typography>);
  };
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={delegate}
      disabled={isPending || isError || isSuccess}
    >
      Invite
    </Button>
  );
};
