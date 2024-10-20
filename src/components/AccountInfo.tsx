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
  Stack,
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
import { useAccount, useReadContract } from "wagmi";
import Token from "@/util/Token.json";

export default function AccountInfo({ tokenInfo }: { tokenInfo: MarketType }) {
  const {
    claimed,
    provider,
    profile,
    profileOwner,
    contractAddress,
    totalSupply,
    inviter,
    fee,
  } = tokenInfo;
  const { address } = useAccount();
  const { data: balance } = useReadContract({
    abi: Token.abi,
    address: contractAddress as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
  });
  const avatar = (
    <Avatar alt={profile} src={getProfileIcon(provider, profile)} />
  );
  return (
    <Card variant="outlined" sx={{ cursor: "pointer", width: "100%" }}>
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
        <Stack direction="row">
          <List dense>
            <ListItem>
              <ListItemText
                primary={totalSupply.toString() + " Tokens"}
                secondary="Total Supply"
              />
            </ListItem>
          </List>
          <List dense>
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
            <ListItem>
              <ListItemText
                primary={
                  balance !== undefined
                    ? (balance as bigint).toString() + " Tokens"
                    : ""
                }
                secondary="Your Token Balance"
              />
            </ListItem>
          </List>
          <List dense>
            <ListItem>
              <ListItemText
                primary={formatEther(fee) + " ETH"}
                secondary="Creator Earnings"
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}
