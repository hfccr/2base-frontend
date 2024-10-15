import {
  Alert,
  AlertTitle,
  Badge,
  Box,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useReadContract } from "wagmi";
import Addresses from "../util/Addresses.json";
import Registry from "../util/Registry.json";
import ProviderIcon from "./ProviderIcon";
import { getProviderName } from "./InvitedLeaderTable";

type InvitesSent = {
  id: string;
  provider: number;
};

type CountedInvitesSent = {
  id: string;
  provider: number;
  count: number;
};

function countItems(originalArray: InvitesSent[]): CountedInvitesSent[] {
  const countMap = new Map<string, CountedInvitesSent>();
  const resultArray: CountedInvitesSent[] = [];

  originalArray.forEach((item) => {
    const key = `${item.provider}-${item.id}`;
    if (!countMap.has(key)) {
      const countedItem: CountedInvitesSent = {
        provider: item.provider,
        id: item.id,
        count: 0,
      };
      countMap.set(key, countedItem);
      resultArray.push(countedItem); // Push to result to maintain order
    }
    countMap.get(key)!.count++; // Increment the count
  });
  return resultArray;
}

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

export const InvitesSent = ({}) => {
  const {
    isError,
    isLoading,
    isSuccess,
    data: invitesSent,
  } = useReadContract({
    abi: Registry.abi,
    address: Addresses.Registry as `0x${string}`,
    functionName: "getInvitedProfiles",
    args: [],
  });
  const invitesSentStructured =
    invitesSent === undefined ? [] : (invitesSent as InvitesSent[]);
  let inviteChips = null;
  if (isSuccess) {
    inviteChips = countItems(invitesSentStructured).map((invite, index) => (
      <Box
        key={index}
        sx={{ mr: 1, mt: 1, lineHeight: "42px" }}
        component="span"
      >
        <Tooltip
          title={`${invite.count} invite${invite.count === 1 ? "" : "s"} sent to ${getProviderName(invite.provider)} user @${invite.id}`}
        >
          <Badge badgeContent={invite.count} color="secondary">
            <Chip
              size="medium"
              label={truncate(invite.id, 20)}
              variant="outlined"
              icon={<ProviderIcon provider={invite.provider} />}
            />
          </Badge>
        </Tooltip>
      </Box>
    ));
  }
  return (
    <>
      {isLoading && <Skeleton height={120} />}
      {isSuccess && (
        <Paper variant="outlined" sx={{ padding: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              {!isSuccess && <Skeleton width={80} />}
              {isSuccess && (
                <>
                  <Typography variant="h2">
                    {invitesSentStructured.length}
                  </Typography>
                  <Typography variant="h6">
                    Invite{invitesSentStructured.length === 1 ? "" : "s"} Sent
                  </Typography>
                </>
              )}
            </Stack>
            {isSuccess && (
              <Chip
                label={`${(invitesSentStructured.length * 0.0001).toFixed(4)} ETH Spent`}
              />
            )}
          </Stack>
          {isSuccess && <Box sx={{ mt: 2 }}>{inviteChips}</Box>}
        </Paper>
      )}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Failed to fetch invite count</AlertTitle>
          Try again later
        </Alert>
      )}
    </>
  );
};
