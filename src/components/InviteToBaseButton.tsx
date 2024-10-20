import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";
import Factory from "@/util/Factory.json";
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
import { getProviderName } from "./InvitedLeaderTable";
import { INVITE_FEE, INVITE_FEE_LABEL } from "@/util/constants";
import { useQueryClient } from "@tanstack/react-query";

interface InviteToBaseButtonProps {
  provider: number;
  id: string;
  disabled: boolean;
}

const factoryContractAddress: Hex = Addresses.Factory as Hex;
const factoryContractAbi = Factory.abi;

export function InviteToBaseOck({
  provider,
  id,
  disabled,
}: InviteToBaseButtonProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const encodedInviteData = encodeFunctionData({
    abi: factoryContractAbi,
    functionName: "createContract",
    args: [provider, id],
  });

  const calls = [
    {
      to: factoryContractAddress,
      data: encodedInviteData,
      // value: INVITE_FEE,
    },
  ];
  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
    setError(false);
  };
  const handleOpen = () => setOpen(true);
  const handleSuccess = () => {
    setSuccess(true);
    console.log("Invalidating scope key invite");
    queryClient.invalidateQueries({ queryKey: ["invite"] });
  };
  const handleError = () => {
    setError(true);
  };
  return (
    <>
      {open && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            Invite {getProviderName(provider)} Profile @{id} On Base
          </DialogTitle>
          <Divider />
          <DialogContent>
            {!success && !error && (
              <Typography>
                Inviting this user on Base will create an ERC20 token with a
                bonding curve. The owner of this profile will be able to claim
                the minting and burning fee generated from the token sale.
              </Typography>
            )}
            {success && (
              <Alert severity="success">
                {getProviderName(provider)} user @{id} succesfully invited to
                Base
              </Alert>
            )}
            {error && !success && (
              <Alert severity="error">
                Failed to invite {getProviderName(provider)} user @{id} to Base
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              {success || error ? "Close" : "Cancel"}
            </Button>
            <Box sx={{ width: 250 }}>
              <Transaction
                calls={calls}
                onStatus={(status) =>
                  console.log("Transaction status:", status)
                }
                onError={handleError}
                onSuccess={handleSuccess}
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
      )}
      <Button variant="outlined" onClick={handleOpen} disabled={disabled}>
        Invite
      </Button>
    </>
  );
}
