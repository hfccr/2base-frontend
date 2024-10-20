import { useState } from "react";
import { MarketType } from "@/util/MarketType";
import { Box, TextField, Stack, Button, Typography } from "@mui/material";
import { useReadContract } from "wagmi";
import Token from "@/util/Token.json";
import { formatEther, parseEther } from "viem";
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
import { encodeFunctionData, Hex } from "viem";

type CostType = {
  cost: bigint;
  fee: bigint;
  totalCost: bigint;
};

export default function Buy({ tokenInfo }: { tokenInfo: MarketType }) {
  const [value, setValue] = useState(0);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };
  const {
    isSuccess,
    data,
    isError,
    isFetching,
    isFetched,
    error,
    failureReason,
  } = useReadContract({
    abi: Token.abi,
    address: tokenInfo.contractAddress as `0x${string}`,
    functionName: "calculateCost",
    args: [value],
  });
  const cost = data as CostType;
  const encodedBuyData =
    !isNaN(value) &&
    encodeFunctionData({
      abi: Token.abi,
      functionName: "buyTokens",
      args: [value],
      // args: [proofs?.solidityProofs || proofReq, { provider, id: profile }],
    });

  const calls = [
    {
      to: tokenInfo.contractAddress as Hex,
      data: encodedBuyData,
      value: cost?.totalCost || 0,
    },
  ];
  return (
    <Stack sx={{ padding: 4 }} spacing={4}>
      <Stack spacing={1} direction="row">
        <TextField
          label="Enter Token Amount"
          type="number"
          sx={{ flexGrow: 1 }}
          value={value}
          onChange={onChange}
          InputProps={{ inputProps: { min: 1, max: 1000 } }}
        />
      </Stack>
      <Typography sx={{ minHeight: 10 }}>
        {isFetched &&
        cost &&
        cost.totalCost !== undefined &&
        value !== 0 &&
        value !== null &&
        value !== undefined &&
        !isNaN(value)
          ? formatEther(cost.totalCost) + " ETH (10% Creator Fee Included)"
          : value === 0 || value === null || value === undefined || isNaN(value)
            ? "Enter Value"
            : "Loading Price..."}
      </Typography>
      <Transaction
        calls={calls}
        // onStatus={handleStatusChange}
        // onSuccess={() => setClaimSuccess(true)}
      >
        <TransactionButton
          text="Buy"
          // disabled={proofs === null}
          disabled={!isFetched || isNaN(value) || value === 0}
        />
        <TransactionSponsor />
        <TransactionToast>
          <TransactionToastIcon />
          <TransactionToastLabel />
          <TransactionToastAction />
        </TransactionToast>
      </Transaction>
    </Stack>
  );
}
