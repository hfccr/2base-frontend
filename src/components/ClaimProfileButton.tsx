import { useState } from "react";
import { useWriteContract } from "wagmi";
import Registry from "@/util/Registry.json";
import Addresses from "@/util/Addresses.json";
import { parseEther } from "viem";
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
import { LifecycleStatus } from "@coinbase/onchainkit/transaction";

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
  const [claimSuccess, setClaimSuccess] = useState(false);
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
              chainId={hardhat.id}
              calls={calls}
              onStatus={handleStatusChange}
              onSuccess={() => setClaimSuccess(true)}
            >
              <TransactionButton
                text="Claim Profile"
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
        Claim Profile
      </Button>
    </>
  );
}
