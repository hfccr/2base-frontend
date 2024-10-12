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
  totalInvites: number;
  claimedInvites: number;
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
    inviteeDetails = data as InviteeDetails[];
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



// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useName } from '@coinbase/onchainkit/identity';
// import { base } from 'viem/chains';

// import { Address } from "viem";
// import { useReadContract } from "wagmi";

// import Addresses from "../util/Addresses.json";
// import Registry from "../util/Registry.json";

// // Function to create row data
// function createData(
//   address: `0x${string}`, // Use the correct type for Ethereum addresses
//   inviteCount: number,
//   claimedCount: number
// ) {
//   return { address, inviteCount, claimedCount };
// }

// // Array of valid Ethereum addresses
// const addresses: `0x${string}`[] = [
//   "0x02feeb0AdE57b6adEEdE5A4EEea6Cf8c21BeB6B1",
//   "0x456123456789abcdef123456789abcdef1234567",  
//   "0x789abcdef123456789abcdef123456789abcdef123", 
//   "0xabc123456789abcdef123456789abcdef123456789", 
//   "0xdef123456789abcdef123456789abcdef123456789", 
// ];

// // Rows of data
// const rows = [
//   createData(addresses[0], 159, 6),
//   createData(addresses[1], 237, 9),
//   createData(addresses[2], 262, 16),
//   createData(addresses[3], 305, 3),
//   createData(addresses[4], 356, 16),
// ];

// // Component to fetch and display the name for each address
// const NameWrapper = ({ address }: { address: `0x${string}` }) => {
//   const { data: name, isLoading } = useName({ address, chain: base });

//   // Handle loading and error states
//   if (isLoading) return <span>Loading...</span>;
//   return <span>{name || address}</span>;  
// };

// export default function InviteeTable() {

//   const {
//     isSuccess,
//     data,
//     isError,
//     isFetching,
//     isFetched,
//     error,
//     failureReason,
//   } = useReadContract({
//     abi: Registry.abi,
//     address: Addresses.Registry as Address,
//     functionName: "getInviteAndClaimedCounts",
//     args: [],
//   });

//   console.log({
//     data,
//     isSuccess,
//     isError,
//     isFetched,
//     isFetching,
//     error,
//     failureReason,
//   });

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Invitee</TableCell>
//             <TableCell align="right">InviteCount</TableCell>
//             <TableCell align="right">ClaimedCount</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.address}>
//               <TableCell component="th" scope="row">
//                 {/* Use the NameWrapper to resolve the name */}
//                 <NameWrapper address={row.address} />
//               </TableCell>
//               <TableCell align="right">{row.inviteCount}</TableCell>
//               <TableCell align="right">{row.claimedCount}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
