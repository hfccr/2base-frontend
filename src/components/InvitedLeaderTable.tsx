import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";
import { useName } from "@coinbase/onchainkit/identity";
import { base } from "viem/chains";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

import { Address } from "viem";
import { useReadContract } from "wagmi";

import Addresses from "../util/Addresses.json";
import Registry from "../util/Registry.json";

// Enum for provider types
export enum Provider {
  GITHUB = 0,
  X = 1,
  YOUTUBE = 2,
  INSTAGRAM = 3,
}

// Function to map provider enum to names
export const getProviderName = (provider: number) => {
  switch (provider) {
    case Provider.GITHUB:
      return "GitHub";
    case Provider.X:
      return "X";
    case Provider.YOUTUBE:
      return "YouTube";
    case Provider.INSTAGRAM:
      return "Instagram";
    default:
      return "Unknown";
  }
};

// Function to create table rows
function createData(
  provider: string,
  address: `0x${string}`,
  inviteCount: number,
  claimCount: number
) {
  return { provider, address, inviteCount, claimCount };
}

// Component to fetch and display the name for each address
const NameWrapper = ({ address }: { address: `0x${string}` }) => {
  const { data: name, isLoading } = useName({ address, chain: base });
  return isLoading ? <span>Loading...</span> : <span>{name || address}</span>;
};

// Function to get the appropriate provider icon
const getProviderIcon = (provider: string) => {
  return provider === "GitHub" ? (
    <GitHubIcon fontSize="small" />
  ) : (
    <TwitterIcon fontSize="small" />
  );
};

export default function InvitedTable() {
  // Fetch data from smart contract using useReadContract
  const { isSuccess, data, isError, isFetching, error } = useReadContract({
    abi: Registry.abi,
    address: Addresses.Registry as Address,
    functionName: "getInviters",
    args: [],
  });

  console.log(data);

  // Loading and error handling
  if (isFetching) return <div>Loading inviters...</div>;
  if (isError) return <div>Error fetching inviters: {error?.message}</div>;

  // Assuming data is an array of ProfileInviteDetails returned from the contract
  const rows = isSuccess && data
    ? (data as any[]).map((profile) =>
        createData(
          getProviderName(profile.provider),
          profile.inviterAddress as `0x${string}`,
          profile.inviteCount,
          profile.claimCount
        )
      )
    : [];

  return (
    <Container>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="invited users table">
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Invite Count</TableCell>
              <TableCell align="right">Claim Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.address}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {getProviderIcon(row.provider)}
                    <span style={{ marginLeft: "8px" }}>{row.provider}</span>
                  </span>
                </TableCell>
                <TableCell align="right">
                  <NameWrapper address={row.address} />
                </TableCell>
                <TableCell align="right">{row.inviteCount}</TableCell>
                <TableCell align="right">{row.claimCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
