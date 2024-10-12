"use client";
import React, { useState, useEffect } from "react";
import {
  ReclaimProofRequest,
  transformForOnchain,
} from "@reclaimprotocol/js-sdk";
import QRCode from "react-qr-code";

export default function ReclaimRequest() {
  const [requestUrl, setRequestUrl] = useState("");
  const [proofs, setProofs] = useState<any>(null);

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
        },
        onError: (error) => {
          console.error("Verification failed", error);
        },
      });
    }

    initializeReclaim();
  }, []);

  return (
    <div>
      <h1>Reclaim Protocol Demo</h1>
      {requestUrl && (
        <div>
          <p>Request URL: {requestUrl}</p>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 512,
              width: "100%",
            }}
          >
            <QRCode
              size={512}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={requestUrl}
              viewBox={`0 0 256 256`}
            />
          </div>
          <p>Use this URL to start the verification process</p>
        </div>
      )}
      {proofs && (
        <div>
          <h2>Verification Successful!</h2>
          <h2>Merke Proof</h2>
          <pre>{JSON.stringify(proofs, null, 2)}</pre>
          <h2>on chain proof</h2>
          <pre>{JSON.stringify(transformForOnchain(proofs))}</pre>
        </div>
      )}
    </div>
  );
}
