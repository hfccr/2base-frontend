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
import { encodeFunctionData, formatEther, Hex, parseEther } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { getProviderName } from "./InvitedLeaderTable";

interface ClaimEarningsButtonProps {
  disabled: boolean;
  provider: number;
  profile: string;
  contractAddress: string;
}

export default function ClaimEarningsButton({
  disabled,
  provider,
  profile,
  contractAddress,
}: ClaimEarningsButtonProps) {
  const { data: feeEarnings } = useReadContract({
    abi: Token.abi,
    address: contractAddress as `0x${string}`,
    functionName: "feeBalance",
    args: [],
  });
  const claimAmount = feeEarnings as bigint;
  const [open, setOpen] = useState(false);
  const [proofs, setProofs] = useState<any>(null);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const setAllProofs = (proofs: any, solidityProofs: any) => {
    setProofs({ proofs, solidityProofs });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setClaimSuccess(false);
  };
  const encodedClaimData = encodeFunctionData({
    abi: Token.abi,
    functionName: "withdraw",
    args: [],
    // args: [proofs?.solidityProofs || proofReq, { provider, id: profile }],
  });

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
          Claim Earnings For {getProviderName(provider)} Profile @{profile}
        </DialogTitle>
        <DialogContent>
          {!claimSuccess && (
            <Typography>
              You will receive {formatEther(claimAmount)} ETH
            </Typography>
          )}
          {claimSuccess && (
            <Alert severity="success">
              You have successfully claimed earings for{" "}
              {getProviderName(provider)} profile @{profile}
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
                text="Claim Earnings"
                // disabled={proofs === null}
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
        Claim Earnings
      </Button>
    </>
  );
}
