import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from "@mui/material";
import { useName } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

function createData(provider: string, address: `0x${string}`, inviteCount: number, claimedCount: number) {
  return { provider, address, inviteCount, claimedCount };
}

const addresses: `0x${string}`[] = [
  "0x02feeb0AdE57b6adEEdE5A4EEea6Cf8c21BeB6B1",
  "0x456123456789abcdef123456789abcdef1234567",  
  "0x789abcdef123456789abcdef123456789abcdef123", 
  "0xabc123456789abcdef123456789abcdef123456789", 
  "0xdef123456789abcdef123456789abcdef123456789", 
];

const rows = [
  createData("github", addresses[0], 159, 6),
  createData("twitter", addresses[1], 237, 9),
  createData("twitter", addresses[2], 262, 16),
  createData("twitter", addresses[3], 305, 3),
  createData("twitter", addresses[4], 356, 16),
];

const generateRandomProfileName = (provider: string) => {
  const githubNames = ["dev_master", "open_source_pro", "code_wizard", "bug_slayer"];
  const twitterNames = ["open_source_pro", "open_source_pro", "open_source_pro", "open_source_pro"];

  return provider === "github" 
    ? githubNames[Math.floor(Math.random() * githubNames.length)]
    : twitterNames[Math.floor(Math.random() * twitterNames.length)];
};

const sortedRows = rows.sort((a, b) => b.inviteCount - a.inviteCount);

const getProviderIcon = (provider: string) => {
  return provider === "github" ? <GitHubIcon fontSize="small" /> : <TwitterIcon fontSize="small" />;
};

const NameWrapper = ({ address }: { address: `0x${string}` }) => {
  const { data: name, isLoading } = useName({ address, chain: base });
  return isLoading ? <span>Loading...</span> : <span>{name || address}</span>;
};

export default function InvitedTable() {
  return (
    <Container>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="invited users table">
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">InviteCount</TableCell>
              <TableCell align="right">ClaimedCount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                key={row.address}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {getProviderIcon(row.provider)}
                    <span style={{ marginLeft: '8px' }}>{generateRandomProfileName(row.provider)}</span>
                  </span>
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