"use client";
import React, { useState, useEffect } from "react";
import { Alert, Container, Skeleton, Stack } from "@mui/material";
import { useAccount } from "wagmi";
import Connect from "@/components/Connect";
import AlertTitle from "@mui/material/AlertTitle";

interface DappLayoutProps {
  children: React.ReactNode;
}

export default function DappLayout({ children }: DappLayoutProps) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const { chain, status } = useAccount();
  const isConnected = status === "connected";
  const wrongChain = chain === undefined;
  const promptSwitch = isConnected && wrongChain;
  return (
    <Container sx={{ marginTop: 0 }} maxWidth="lg">
      {!isConnected && hydrated && (
        <Stack
          direction="column"
          spacing={8}
          justifyContent="center"
          alignItems="center"
        >
          <Alert severity="info" title="Hello" action={<Connect />}>
            <AlertTitle>Connect Wallet</AlertTitle>
            Connect your wallet to continue
          </Alert>
        </Stack>
      )}
      {promptSwitch && hydrated && (
        <Stack direction="column" spacing={8} sx={{ minWidth: "md" }}>
          <Alert severity="info" action={<Connect />}>
            <AlertTitle>Switch Network</AlertTitle>
            Switch network to continue
          </Alert>
        </Stack>
      )}
      {!hydrated && (
        <Container maxWidth="md">
          <Stack spacing={0}>
            <Skeleton height={50} />
            <Skeleton height={400} />
          </Stack>
        </Container>
      )}
      {isConnected && !wrongChain && hydrated && <>{children}</>}
    </Container>
  );
}
