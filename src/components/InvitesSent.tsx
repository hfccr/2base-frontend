import {
  Alert,
  AlertTitle,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useReadContract } from "wagmi";
import Addresses from "../util/Addresses.json";
import Registry from "../util/Registry.json";
import ProviderIcon from "./ProviderIcon";

interface InvitesSentInterface {
  id: string;
  provider: number;
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
    invitesSent === undefined ? [] : (invitesSent as InvitesSentInterface[]);
  console.log("Invites sent", invitesSent);
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
                label={`${invitesSentStructured.length * 0.0001} ETH Spent`}
              />
            )}
          </Stack>
          {isSuccess && (
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              {invitesSentStructured.map((invite) => (
                <Chip
                  label={invite.id}
                  icon={<ProviderIcon provider={invite.provider} />}
                />
              ))}
            </Stack>
          )}
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
