import { useState } from "react";
import {
  TextField,
  Select,
  Stack,
  FormControl,
  MenuItem,
  Paper,
  Box,
  Container,
  InputAdornment,
  SelectChangeEvent,
  Typography,
  Divider,
  Chip,
  Alert,
} from "@mui/material";
import { getProviderName, Provider } from "@/util/Providers";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import { InviteToBaseButton, InviteToBaseOck } from "./InviteToBaseButton";
import { useDebounce } from "use-debounce";
import { useReadContract } from "wagmi";
import Registry from "@/util/Registry.json";
import Addresses from "@/util/Addresses.json";

export default function SendToWeb2() {
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
  const disabled = profile.length === 0 || !isSuccess || profileData[2];
  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Stack direction="column" spacing={4}>
        <Box>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="h6">Web2 Creators And Friends</Typography>
            <Chip label="Sends 0.0001 ETH" />
          </Stack>
          <Divider sx={{ width: "100%", marginTop: 2 }} />
        </Box>
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
                label="Profile"
                id="profile"
                required
                value={profile}
                onChange={handleProfileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
              />
              {/* <TextField label="ETH" type="number" required /> */}
            </Stack>
            <Box sx={{ minHeight: 50 }}>
              {isSuccess && profileData[2] && (
                <Alert>Profile already on Base</Alert>
              )}
            </Box>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <InviteToBaseOck
                provider={provider}
                id={profile}
                disabled={disabled}
              />
            </Stack>
          </Stack>
        </FormControl>
      </Stack>
    </Paper>
  );
}
