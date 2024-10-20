import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { MarketType } from "@/util/MarketType";
import ClaimProfileButton from "./ClaimProfileButton";
import { Name } from "@coinbase/onchainkit/identity";
import { getProviderName } from "./InvitedLeaderTable";

export default function ClaimStatus({ tokenInfo }: { tokenInfo: MarketType }) {
  const { claimed, provider, profile, profileOwner, contractAddress } =
    tokenInfo;
  const title = claimed ? "Token Claimed" : "Claim Token";
  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">{title}</Typography>
        {!claimed && (
          <Typography>
            If {getProviderName(provider)} profile @{profile} belongs to you,
            you can claim it by submitting a zkTLS proof
          </Typography>
        )}
        {claimed && (
          <Stack direction="row" justifyContent="space-between">
            <Typography>Owner</Typography>
            <Typography>
              <Name
                address={profileOwner as `0x${string}`}
                className="token-name"
              />
            </Typography>
          </Stack>
        )}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <ClaimProfileButton
            disabled={claimed}
            profile={profile}
            provider={provider}
            contractAddress={contractAddress}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
