import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useName } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';

import { Address } from "viem";
import { useReadContract } from "wagmi";

import Addresses from "../util/Addresses.json";
import Registry from "../util/Registry.json";

// Define a type for the invitee details
interface InviteeDetails {
  invitee: string;
  totalInvites: number;  // Use number instead of BigInt for rendering
  claimedInvites: number;  // Use number instead of BigInt for rendering
}

// Component to fetch and display the name for each address
const NameWrapper = ({ address }: { address: `0x${string}` }) => {
  const { data: name, isLoading } = useName({ address, chain: base });

  if (isLoading) return <span>Loading...</span>;
  return <span>{name || address}</span>;
};

export default function InviteeTable() {
  const {
    isSuccess,
    data,
    isError,
    isFetching,
    isFetched,
    error,
    failureReason,
  } = useReadContract({
    abi: Registry.abi,
    address: Addresses.Registry as Address,
    functionName: "getInviteAndClaimedCounts",
    args: [],
  });

  if (isFetching) return <div>Loading data from contract...</div>;
  if (isError) return <div>Error fetching data: {error?.message }</div>;

  // Ensure the data is an array of invitee details
  let inviteeDetails: InviteeDetails[] = [];
  if (isSuccess && Array.isArray(data)) {
    inviteeDetails = data.map((item: any) => ({
      invitee: item.invitee,
      totalInvites: Number(item.totalInvites),  // Convert BigInt to number
      claimedInvites: Number(item.claimedInvites),  // Convert BigInt to number
    }));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="invitee table">
        <TableHead>
          <TableRow>
            <TableCell>Invitee</TableCell>
            <TableCell align="right">Invite Count</TableCell>
            <TableCell align="right">Claimed Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inviteeDetails.map((row: InviteeDetails) => (
            <TableRow key={row.invitee}>
              <TableCell component="th" scope="row">
                <NameWrapper address={row.invitee as `0x${string}`} />
              </TableCell>
              <TableCell align="right">{row.totalInvites}</TableCell>
              <TableCell align="right">{row.claimedInvites}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}





