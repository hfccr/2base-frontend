import { proofReq } from "@/junk/proofRequest";
import Addresses from "@/util/Addresses.json";
import Factory from "@/util/Factory.json";
import Token from "@/util/Token.json";
import {
  LifecycleStatus,
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionToast,
  TransactionToastAction,
  TransactionToastIcon,
  TransactionToastLabel,
} from "@coinbase/onchainkit/transaction";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { encodeFunctionData, Hex } from "viem";
import { useWriteContract } from "wagmi";
import { getProviderName } from "./InvitedLeaderTable";
import ReclaimRequest from "./ReclaimRequest";

interface ClaimProfileButtonProps {
  disabled: boolean;
  provider: number;
  profile: string;
  contractAddress: string;
}

export default function ClaimProfileButton({
  disabled,
  provider,
  profile,
  contractAddress,
}: ClaimProfileButtonProps) {
  const [open, setOpen] = useState(false);
  const [proofs, setProofs] = useState<any>(null);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const setAllProofs = (proofs: any, solidityProofs: any) => {
    setProofs({ proofs, solidityProofs });
  };
  console.log({ proofs });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setClaimSuccess(false);
  };
  const { isPending, isSuccess, isError, error, writeContract } =
    useWriteContract();
  const encodedClaimData =
    (proofs &&
      proofs.solidityProofs &&
      encodeFunctionData({
        abi: Token.abi,
        functionName: "claimTokenAccount",
        args: [proofs?.solidityProofs],
        // args: [proofs?.solidityProofs || proofReq, { provider, id: profile }],
      })) ||
    undefined;

  const calls = [
    {
      to: contractAddress as Hex,
      data: encodedClaimData,
    },
  ];

  const handleStatusChange = (status: LifecycleStatus) => {
    console.log(status);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Claim {getProviderName(provider)} Profile @{profile}
        </DialogTitle>
        <DialogContent>
          {!claimSuccess && (
            <ReclaimRequest
              provider={provider}
              id={profile}
              setAllProofs={setAllProofs}
            />
          )}
          {claimSuccess && (
            <Alert severity="success">
              You have successfully claimed {getProviderName(provider)} profile
              @{profile}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            {claimSuccess ? "Close" : "Cancel"}
          </Button>
          <Box sx={{ width: 250 }}>
            <Transaction
              calls={calls}
              onStatus={handleStatusChange}
              onSuccess={() => setClaimSuccess(true)}
            >
              <TransactionButton
                text="Claim Profile"
                disabled={proofs === null}
              />
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
