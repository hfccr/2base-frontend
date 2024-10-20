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
import { useQueryClient } from "@tanstack/react-query";

type CostType = {
  cost: bigint;
  fee: bigint;
  totalCost: bigint;
};

export default function Sell({ tokenInfo }: { tokenInfo: MarketType }) {
  const queryClient = useQueryClient();
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
    functionName: "calculateRevenue",
    args: [value],
  });
  const cost = data as CostType;
  const encodedSellData =
    !isNaN(value) &&
    encodeFunctionData({
      abi: Token.abi,
      functionName: "sellTokens",
      args: [value],
      // args: [proofs?.solidityProofs || proofReq, { provider, id: profile }],
    });

  const calls = [
    {
      to: tokenInfo.contractAddress as Hex,
      data: encodedSellData,
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
        onSuccess={() => {
          queryClient.invalidateQueries();
        }}
        onError={() => {
          queryClient.invalidateQueries();
        }}
      >
        <TransactionButton
          text="Sell"
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
