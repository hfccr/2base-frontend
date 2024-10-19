import { useReadContract } from "wagmi";
import Factory from "@/util/Factory.json";
import Addresses from "@/util/Addresses.json";
import { Alert, Grid, Typography } from "@mui/material";
import Token from "./Token";

type MarketType = {
  contractAddress: string;
  id: bigint;
  inviter: string;
  profile: string;
  provider: number;
  totalSupply: bigint;
  fee: bigint;
  claimed: boolean;
  profileOwner: string;
};

export default function Market() {
  const { isError, isFetched, data } = useReadContract({
    abi: Factory.abi,
    address: Addresses.Factory as `0x${string}`,
    functionName: "getDeployedContracts",
    args: [],
  });
  const market = data as MarketType[];
  return (
    <>
      {isError && !isFetched && (
        <Alert severity="error">Failed to fetch market info</Alert>
      )}
      {isFetched && market.length === 0 && (
        <Alert severity="info">No tokens created yet</Alert>
      )}
      {isFetched && market.length > 0 && (
        <Grid container spacing={4}>
          {market.map((token) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={4}
              key={token.contractAddress}
            >
              <Token
                contractAddress={token.contractAddress}
                id={token.id}
                inviter={token.inviter}
                profile={token.profile}
                provider={token.provider}
                totalSupply={token.totalSupply}
                fee={token.fee}
                claimed={token.claimed}
                profileOwner={token.profileOwner}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
