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
import { MarketType } from "@/util/MarketType";
import Link from "next/link";

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
}: MarketType) {
  const avatar = (
    <Avatar alt={profile} src={getProfileIcon(provider, profile)} />
  );
  return (
    <Link href={`/dapp/join/${id}`}>
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
            <Tooltip title={`${getProviderName(provider)} Profile`}>
              <IconButton
              // href={getProfileLink(provider, profile)}
              // target="_blank"
              // rel="noreferrer noopener"
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
                secondary="Creator Earnings"
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
    </Link>
  );
}
