import { MarketType } from "@/util/MarketType";
import { Paper, Stack } from "@mui/material";
import AccountInfo from "./AccountInfo";

interface TokenDetailsProps {
  tokenInfo: MarketType;
}

export default function TokenDetails({ tokenInfo }: TokenDetailsProps) {
  return (
    <Stack direction="row" spacing={2}>
      <AccountInfo tokenInfo={tokenInfo} />
    </Stack>
  );
}
