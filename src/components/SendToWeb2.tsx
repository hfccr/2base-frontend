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
} from "@mui/material";
import { getProviderName, Provider } from "@/util/Providers";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import {
  InviteToBaseButton,
  // InviteToBaseOck
} from "./InviteToBaseButton";

export default function SendToWeb2() {
  const [provider, setProvider] = useState(Provider.GITHUB);
  const handleProviderChange = (event: SelectChangeEvent) => {
    setProvider(parseInt(event.target.value));
  };
  const [profile, setProfile] = useState("");
  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(event.target.value);
  };
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
            <Box sx={{ textAlign: "center" }}>
              <InviteToBaseButton provider={provider} id={profile} />
              {/* <InviteToBaseOck provider={provider} id={profile} /> */}
            </Box>
          </Stack>
        </FormControl>
      </Paper>
    </Container>
  );
}
