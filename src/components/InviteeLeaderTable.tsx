import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";

function createData(
  name: string,
  inviteCount: number,
  claimedCount: number,
) {
  return { name, inviteCount, claimedCount };
}

const addresses = [
  "0x123...abc",
  "0x456...def",
  "0x789...ghi",
  "0xabc...jkl",
  "0xdef...mno",
];

const rows = [
  createData(addresses[0], 159, 6),
  createData(addresses[1], 237, 9),
  createData(addresses[2], 262, 16),
  createData(addresses[3], 305, 3),
  createData(addresses[4], 356, 16),
];

// Sort rows by inviteCount (previously calories)
const sortedRows = rows.sort((a, b) => b.inviteCount - a.inviteCount);

export default function InviteeTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Invitee</TableCell>
            <TableCell align="right">InviteCount</TableCell>
            <TableCell align="right">ClaimedCount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.inviteCount}</TableCell>
              <TableCell align="right">{row.claimedCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
