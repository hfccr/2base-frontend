"use client";
import React, { useState, useEffect } from "react";
import {
  ReclaimProofRequest,
  transformForOnchain,
} from "@reclaimprotocol/js-sdk";
import QRCode from "react-qr-code";
import { Alert, Box, Skeleton, Stack } from "@mui/material";
import { getProviderName } from "./InvitedLeaderTable";
import { ReclaimAssets } from "./ReclaimAssets";

interface ReclaimRequestProps {
  provider: number;
  id: string;
  setAllProofs: Function;
}

export default function ReclaimRequest({
  provider,
  id,
  setAllProofs,
}: ReclaimRequestProps) {
  const [requestUrl, setRequestUrl] = useState("");
  const [proofs, setProofs] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function initializeReclaim() {
      const APP_ID = "0x5473aBf898443e1277ec079563BcA9f9aEe5d6e8";
      // const APP_ID = "0x62deA5dF1940A84A408Ec2446Db8824aA704c053";
      const APP_SECRET =
        "0x097972479cadfb156da8f0e796f8f807140444537df7eff4fc633fcebc628d78";
      const PROVIDER_ID =
        ReclaimAssets[provider as keyof typeof ReclaimAssets].PROVIDER_ID;
      // const APP_SECRET =
      //   "0xc813b556f829dcead74c34d7685b7168745d43fdc13d50f40aaea256a0d832ba";
      // const PROVIDER_ID = "6d3f6753-7ee6-49ee-a545-62f1b1822ae5";

      console.log("APp id", APP_ID, APP_SECRET, PROVIDER_ID);

      const reclaimProofRequest = await ReclaimProofRequest.init(
        APP_ID,
        APP_SECRET,
        PROVIDER_ID
      );

      const url = await reclaimProofRequest.getRequestUrl();
      setRequestUrl(url);

      await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          console.log("Verification success", proofs);
          setProofs(proofs);
          setAllProofs(proofs, transformForOnchain(proofs));
        },
        onError: (error) => {
          console.error("Verification failed", error);
          setError(true);
        },
      });
    }

    initializeReclaim();
  }, []);

  return (
    <>
      {error && <Alert severity="error">Failed to generate proof</Alert>}
      <Stack direction="column" spacing={4} justifyContent="center">
        <Alert severity="info">
          Scan the QR code below with your Android or iOS device. You will need
          to enable Instant Apps or App Clips depending on your platform.
        </Alert>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {!error && !proofs && requestUrl && (
            <div
              style={{
                height: 256,
                maxWidth: 256,
                width: 256,
              }}
            >
              <QRCode
                size={256}
                style={{ height: "256px", width: "256px" }}
                value={requestUrl}
                viewBox={`0 0 256 256`}
              />
            </div>
          )}
          {!requestUrl && <Skeleton width={256} height={256} />}
        </Box>
      </Stack>
      {proofs && (
        <div>
          <Alert severity="success">
            Proof for ownership of {getProviderName(provider)} @{id} generated
            successfully
          </Alert>
          {/* <h2>Verification Successful!</h2>
          <h2>Merke Proof</h2>
          <pre>{JSON.stringify(proofs, null, 2)}</pre>
          <h2>on chain proof</h2>
          <pre>{JSON.stringify(transformForOnchain(proofs))}</pre> */}
        </div>
      )}
    </>
  );
}
