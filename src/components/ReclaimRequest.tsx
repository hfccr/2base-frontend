"use client";
import React, { useState, useEffect } from "react";
import {
  ReclaimProofRequest,
  transformForOnchain,
} from "@reclaimprotocol/js-sdk";
import QRCode from "react-qr-code";
import { Alert, Skeleton } from "@mui/material";

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
      const APP_ID = "0x62deA5dF1940A84A408Ec2446Db8824aA704c053";
      const APP_SECRET =
        "0xc813b556f829dcead74c34d7685b7168745d43fdc13d50f40aaea256a0d832ba";
      const PROVIDER_ID = "6d3f6753-7ee6-49ee-a545-62f1b1822ae5";

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
    <div>
      {error && <Alert severity="error">Failed to generate proof</Alert>}
      {!error && !proofs && requestUrl && (
        <div>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 256,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={requestUrl}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      )}
      {!requestUrl && <Skeleton width={256} height={256} />}
      {proofs && (
        <div>
          <Alert severity="success">
            Proof for ownership of @{id} generated successfully
          </Alert>
          {/* <h2>Verification Successful!</h2>
          <h2>Merke Proof</h2>
          <pre>{JSON.stringify(proofs, null, 2)}</pre>
          <h2>on chain proof</h2>
          <pre>{JSON.stringify(transformForOnchain(proofs))}</pre> */}
        </div>
      )}
    </div>
  );
}
