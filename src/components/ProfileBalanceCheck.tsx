import { useState } from "react";
import {
  Container,
  Paper,
  FormControl,
  Stack,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  Box,
  SelectChangeEvent,
  Typography,
  Skeleton,
  Alert,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import { useReadContract } from "wagmi";
import Registry from "@/util/Registry.json";
import Addresses from "@/util/Addresses.json";
import { getProviderName, Provider } from "@/util/Providers";
import { formatEther, parseEther, parseGwei } from "viem";
import { useDebounce } from "use-debounce";
import ClaimProfileButton from "./ClaimProfileButton";

interface ProfileBalanceCheckProps {
  tokenId: number;
}

export default function ProfileBalanceCheck({
  tokenId,
}: ProfileBalanceCheckProps) {
  const [provider, setProvider] = useState(Provider.GITHUB);
  const handleProviderChange = (event: SelectChangeEvent) => {
    setProvider(parseInt(event.target.value));
  };
  const [profile, setProfile] = useState("");
  const [debouncedValue] = useDebounce(profile, 1000);
  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(event.target.value);
  };
  const {
    isSuccess,
    data,
    isError,
    isFetching,
    isFetched,
    error,
    failureReason,
  } = useReadContract({
    abi: Registry.abi,
    address: Addresses.Registry as `0x${string}`,
    functionName: "getProfileBalanceAndInviteCount",
    args: [{ provider, id: debouncedValue }],
  });

  const profileData = data as [bigint, bigint, boolean];

  return (
    <Container sx={{ textAlign: "center", marginTop: 4 }}>
      <Paper variant="outlined" sx={{ padding: 8 }}>
        <FormControl fullWidth>
          <Stack direction="column" spacing={4}>
            <Stack direction={{ lg: "row", md: "column" }} spacing={4}>
              <Select
                labelId="platform"
                id="select-platform"
                value={provider.toString()}
                onChange={handleProviderChange}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value={Provider.GITHUB}>
                  <GitHubIcon sx={{ mr: 2 }} />
                  {getProviderName(Provider.GITHUB)}
                </MenuItem>
                <MenuItem value={Provider.X}>
                  <XIcon sx={{ mr: 2 }} />
                  {getProviderName(Provider.X)}
                </MenuItem>
                <MenuItem value={Provider.YOUTUBE}>
                  <YouTubeIcon sx={{ mr: 2 }} />
                  {getProviderName(Provider.YOUTUBE)}
                </MenuItem>
                <MenuItem value={Provider.INSTAGRAM}>
                  <InstagramIcon sx={{ mr: 2 }} />
                  {getProviderName(Provider.INSTAGRAM)}
                </MenuItem>
              </Select>
              <TextField
                fullWidth
                label="Your Profile"
                id="profile"
                value={profile}
                onChange={handleProfileChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack
              direction={{ lg: "row", md: "column" }}
              spacing={4}
              sx={{ minHeight: 48 }}
              justifyContent="center"
              alignItems="center"
            >
              {profile.length > 0 && debouncedValue.length > 0 && (
                <>
                  {!isFetched && <Skeleton height={48} width={500} />}
                  {isFetched && (
                    <Alert severity="info">
                      {isSuccess && isFetched && (
                        <>
                          {profileData[2] === true && (
                            <>@{debouncedValue} already claimed</>
                          )}
                          {profileData[2] === false && (
                            <>
                              @{debouncedValue} has{" "}
                              {formatEther(profileData[0])} ETH claimable from{" "}
                              {profileData[1].toString()} invites.
                            </>
                          )}
                        </>
                      )}
                    </Alert>
                  )}
                </>
              )}
            </Stack>
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ pl: 8, pr: 8 }}>
                <ClaimProfileButton
                  profile={profile}
                  provider={provider}
                  disabled={
                    !(
                      profile.length > 0 &&
                      isSuccess &&
                      profileData[2] === false
                    )
                  }
                />
              </Box>
            </Box>
          </Stack>
        </FormControl>
      </Paper>
    </Container>
  );
}
