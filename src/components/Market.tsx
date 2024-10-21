import { useReadContract } from "wagmi";
import Factory from "@/util/Factory.json";
import Addresses from "@/util/Addresses.json";
import {
  Alert,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Token from "./Token";
import { MarketType } from "@/util/MarketType";
import Link from "next/link";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";

export default function Market() {
  const { isError, isFetched, data } = useReadContract({
    abi: Factory.abi,
    address: Addresses.Factory as `0x${string}`,
    functionName: "getDeployedContracts",
    args: [],
  });
  const market = data as MarketType[];
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 1000);
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{ margin: 2 }}
      >
        <TextField
          value={value}
          onChange={handleValueChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Link href="/dapp/send">
          <Button variant="outlined" size="large">
            Create New Token
          </Button>
        </Link>
      </Stack>
      {isError && !isFetched && (
        <Alert severity="error">Failed to fetch market info</Alert>
      )}
      {isFetched && market.length === 0 && (
        <Alert severity="info">No tokens created yet</Alert>
      )}
      {isFetched && market.length > 0 && (
        <Grid container spacing={4}>
          {market
            .reverse()
            .filter((token) => {
              if (value !== "") {
                return (
                  token.profile.toLowerCase().indexOf(value.toLowerCase()) >= 0
                );
              } else {
                return true;
              }
            })
            .map((token) => (
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
