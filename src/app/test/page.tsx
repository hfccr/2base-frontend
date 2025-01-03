"use client";
import { Button, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";
import reclaimAbi from "../../artifacts/Reclaim.json";
import { proofReq } from "../../junk/proofRequest";

export default function Test() {
  const { isPending, isSuccess, isError, data, writeContract, error } =
    useWriteContract();
  const delegate = () => {
    writeContract({
      abi: reclaimAbi.abi,
      address: "0xF90085f5Fd1a3bEb8678623409b3811eCeC5f6A5" as `0x${string}`,
      functionName: "verifyProof",
      args: [proofReq],
    });
    toast((t) => <Typography>Verifying Profile</Typography>);
  };
  console.log({ isPending, isSuccess, isError, data, error });
  return <Button onClick={delegate}>Submit</Button>;
}
