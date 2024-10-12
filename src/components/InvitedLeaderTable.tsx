import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Typography,
  TextField,
  Select,
  Stack,
  FormControl,
  MenuItem,
  IconButton,
  InputLabel,
  Button,
  Box,
  Container,
  InputAdornment,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import TwitterIcon from "@mui/icons-material/Twitter";  // Twitter icon import

function createData(provider: string, name: string, inviteCount: number, claimedCount: number) {
  return { provider, name, inviteCount, claimedCount };
}

const addresses = [
  "0x123...abc",
  "0x456...def",
  "0x789...ghi",
  "0xabc...jkl",
  "0xdef...mno",
];

const rows = [
  createData("github", addresses[0], 159, 6),
  createData("twitter", addresses[1], 237, 9),
  createData("twitter", addresses[2], 262, 16),
  createData("twitter", addresses[3], 305, 3),
  createData("twitter", addresses[4], 356, 16),
];

// Sort rows by inviteCount (previously calories)
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

export default function InvitedTable() {
  return (
    <Container>
     
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Provider</TableCell>
              <TableCell align="right">Invited</TableCell>
              <TableCell align="right">InviteCount</TableCell>
              <TableCell align="right">ClaimedCount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {getProviderIcon(row.provider)}
                  {row.provider}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
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
