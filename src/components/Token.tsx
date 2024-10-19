import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ProviderIcon from "./ProviderIcon";
import { getProfileIcon, getProfileLink } from "@/util/Providers";
import truncate from "@/util/truncate";
import { getProviderName } from "./InvitedLeaderTable";

interface TokenInterface {
  contractAddress: string;
  id: bigint;
  inviter: string;
  profile: string;
  provider: number;
  totalSupply: bigint;
  fee: bigint;
  claimed: boolean;
  profileOwner: string;
}

export default function Token({
  contractAddress,
  id,
  inviter,
  profile,
  provider,
}: TokenInterface) {
  return (
    <Card variant="outlined" sx={{ cursor: "pointer" }}>
      <CardHeader
        title={truncate(profile, 20)}
        avatar={
          <Avatar alt={profile} src={getProfileIcon(provider, profile)} />
        }
        action={
          <Tooltip title={`Visit ${getProviderName(provider)} Profile`}>
            <IconButton
              href={getProfileLink(provider, profile)}
              target="_blank"
              rel="noreferrer noopener"
            >
              <ProviderIcon provider={provider} />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent></CardContent>
      <CardActions>
        <Button>View</Button>
      </CardActions>
    </Card>
  );
}
