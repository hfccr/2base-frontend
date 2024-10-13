import { useState } from "react";
import { useWriteContract } from "wagmi";
import Registry from "@/util/Registry.json";
import Addresses from "@/util/Addresses.json";
import { parseEther } from "viem";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import ReclaimRequest from "./ReclaimRequest";
import { getProviderName } from "./InvitedLeaderTable";
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

const registryContractAddress: Hex = Addresses.Registry as Hex;
const registryContractAbi = Registry.abi;

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
  const [open, setOpen] = useState(false);
  const [proofs, setProofs] = useState<any>(null);
  const setAllProofs = (proofs: any, solidityProofs: any) => {
    setProofs({ proofs, solidityProofs });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const encodedClaimData = encodeFunctionData({
    abi: registryContractAbi,
    functionName: "claim",
    args: [{ provider, id: profile }],
  });

  const calls = [
    {
      to: registryContractAddress,
      data: encodedClaimData,
    },
  ];
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Claim {getProviderName(provider)} Profile @{profile}
        </DialogTitle>
        <DialogContent>
          <ReclaimRequest
            provider={provider}
            id={profile}
            setAllProofs={setAllProofs}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={delegate}
            // disabled={proofs === null}
          >
            Claim
          </Button>
          <Transaction
            chainId={hardhat.id}
            calls={calls}
            onStatus={(status) => console.log("Transaction status:", status)}
          >
            <TransactionButton />
            <TransactionSponsor />
            <TransactionToast>
              <TransactionToastIcon />
              <TransactionToastLabel />
              <TransactionToastAction />
            </TransactionToast>
          </Transaction>
        </DialogActions>
      </Dialog>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleOpen}
        disabled={disabled}
      >
        Claim Profile
      </Button>
    </>
  );
}
