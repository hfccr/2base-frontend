import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import ProviderIcon from "./ProviderIcon";
import { getProfileIcon, getProfileLink } from "@/util/Providers";
import truncate from "@/util/truncate";
import { getProviderName } from "./InvitedLeaderTable";
import { Name } from "@coinbase/onchainkit/identity";
import { formatEther } from "viem";

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
  totalSupply,
  fee,
  claimed,
  profileOwner,
}: TokenInterface) {
  const avatar = (
    <Avatar alt={profile} src={getProfileIcon(provider, profile)} />
  );
  return (
    <Card variant="outlined" sx={{ cursor: "pointer" }}>
      <CardHeader
        title={truncate(profile, 20)}
        avatar={
          <>
            {claimed && (
              <Badge
                badgeContent={"✓"}
                color={"success"}
                sx={{ display: claimed ? "block" : "none" }}
              >
                {avatar}
              </Badge>
            )}
            {!claimed && avatar}
          </>
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
      <CardContent>
        <List dense>
          <ListItem>
            <ListItemText
              primary={totalSupply.toString()}
              secondary="Total Supply"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={formatEther(fee) + " ETH"}
              secondary="Creator Claim"
            />
          </ListItem>
          {/* <ListItem>
            <ListItemText
              primary={
                <Name
                  address={inviter as `0x${string}`}
                  className="token-name"
                />
              }
              secondary="Invited By"
            />
          </ListItem> */}
        </List>
      </CardContent>
    </Card>
  );
}
