import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useName } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import { Container } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";  // Twitter icon import

// Function to create data rows
function createData(provider: string, address: `0x${string}`, inviteCount: number, claimedCount: number) {
  return { provider, address, inviteCount, claimedCount };
}

// Array of addresses (use valid Ethereum addresses)
const addresses: `0x${string}`[] = [
  "0x02feeb0AdE57b6adEEdE5A4EEea6Cf8c21BeB6B1",
  "0x456123456789abcdef123456789abcdef1234567",  
  "0x789abcdef123456789abcdef123456789abcdef123", 
  "0xabc123456789abcdef123456789abcdef123456789", 
  "0xdef123456789abcdef123456789abcdef123456789", 
];

// Create rows of data
const rows = [
  createData("github", addresses[0], 159, 6),
  createData("twitter", addresses[1], 237, 9),
  createData("twitter", addresses[2], 262, 16),
  createData("twitter", addresses[3], 305, 3),
  createData("twitter", addresses[4], 356, 16),
];

// Sort rows by inviteCount
const sortedRows = rows.sort((a, b) => b.inviteCount - a.inviteCount);

// Function to return the correct icon based on the provider
const getProviderIcon = (provider: string) => {
  switch (provider) {
    case "github":
      return <GitHubIcon sx={{ mr: 2 }} />;
    case "twitter":
      return <TwitterIcon sx={{ mr: 2 }} />;
    case "youtube":
      return <YouTubeIcon sx={{ mr: 2 }} />;
    case "instagram":
      return <InstagramIcon sx={{ mr: 2 }} />;
    default:
      return null;
  }
};

// Component to fetch and display the name for each address
const NameWrapper = ({ address }: { address: `0x${string}` }) => {
  const { data: name, isLoading } = useName({ address, chain: base });

  // Handle loading state
  if (isLoading) return <span>Loading...</span>;
  return <span>{name || address}</span>;  // Fallback to the address if no name
};

export default function InvitedTable() {
  return (
    <Container>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Provider</TableCell>
              <TableCell align="right">Invited Name/Address</TableCell>
              <TableCell align="right">InviteCount</TableCell>
              <TableCell align="right">ClaimedCount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                key={row.address} // Use address as the key for uniqueness
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* Separate Provider and Name into different cells */}
                <TableCell component="th" scope="row">
                  {getProviderIcon(row.provider)}
                  {row.provider}
                </TableCell>
                <TableCell align="right">
                  <NameWrapper address={row.address} />
                </TableCell>
                <TableCell align="right">{row.inviteCount}</TableCell>
                <TableCell align="right">{row.claimedCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
