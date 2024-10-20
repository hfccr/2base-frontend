import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAccount, useReadContract } from "wagmi";
import Addresses from "@/util/Addresses.json";
import Factory from "@/util/Factory.json";
import ProviderIcon from "./ProviderIcon";
import { getProviderName } from "./InvitedLeaderTable";
import truncate from "@/util/truncate";
import { MarketType } from "@/util/MarketType";

export const InvitesSent = ({}) => {
  const { address } = useAccount();
  const {
    isError,
    isLoading,
    isSuccess,
    data: invitesSent,
  } = useReadContract({
    abi: Factory.abi,
    address: Addresses.Factory as `0x${string}`,
    functionName: "getDeployedContractsByInviter",
    args: [address],
    scopeKey: "invite",
    blockTag: "latest",
  });
  const invitesSentStructured =
    invitesSent === undefined ? [] : (invitesSent as MarketType[]);
  let inviteChips = null;
  if (isSuccess) {
    inviteChips = invitesSentStructured.map((invite, index) => (
      <Box
        key={index}
        sx={{ mr: 1, mt: 1, lineHeight: "42px" }}
        component="span"
      >
        <Tooltip
          title={`Invite sent to ${getProviderName(invite.provider)} user @${invite.profile}`}
        >
          <Chip
            size="medium"
            label={truncate(invite.profile, 20)}
            variant="outlined"
            icon={<ProviderIcon provider={invite.provider} />}
          />
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
                label={`${(invitesSentStructured.length * 0.001).toFixed(3)} ETH Spent`}
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
