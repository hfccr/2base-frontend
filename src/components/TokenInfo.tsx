import { useReadContract } from "wagmi";
import Factory from "@/util/Factory.json";
import Addresses from "@/util/Addresses.json";
import { MarketType } from "@/util/MarketType";
import { Box, Stack } from "@mui/material";
import TokenDetails from "./TokenDetails";
import ViewToken from "./ViewToken";
import ClaimStatus from "./ClaimStatus";
import TradeToken from "./TradeToken";

interface TokenInfoProps {
  tokenId: number;
}

export default function TokenInfo({ tokenId }: TokenInfoProps) {
  const { isFetched, isError, data } = useReadContract({
    abi: Factory.abi,
    address: Addresses.Factory as `0x${string}`,
    functionName: "getDeployedContractByTokenId",
    args: [tokenId],
  });
  const tokenInfo = data as MarketType;
  return (
    <>
      {isFetched && (
        <Box sx={{ width: "100%" }}>
          <Stack direction={{ md: "column", lg: "row" }} spacing={4}>
            <Stack
              direction="column"
              spacing={4}
              sx={{ width: { md: "100%", lg: "60%" } }}
            >
              <TokenDetails tokenInfo={tokenInfo} />
              <TradeToken tokenInfo={tokenInfo} />
            </Stack>
            <Stack
              direction="column"
              spacing={4}
              sx={{
                width: { md: "100%", lg: "40%" },
                marginTop: { sm: 4, xs: 4 },
              }}
            >
              <ClaimStatus tokenInfo={tokenInfo} />
              <ViewToken address={tokenInfo.contractAddress} />
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
}
