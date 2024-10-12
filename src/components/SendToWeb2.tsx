import { useState } from "react";
import {
  TextField,
  Select,
  Stack,
  FormControl,
  MenuItem,
  Button,
  Paper,
  Box,
  Container,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

export default function SendToWeb2() {
  const [provider, setProvider] = useState("github");
  const handleProviderChange = (event: SelectChangeEvent) => {
    setProvider(event.target.value);
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
                value={provider}
                onChange={handleProviderChange}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value={"github"}>
                  <GitHubIcon sx={{ mr: 2 }} />
                  GitHub
                </MenuItem>
                <MenuItem value={"x"}>
                  <XIcon sx={{ mr: 2 }} />X
                </MenuItem>
                <MenuItem value={"youtube"}>
                  <YouTubeIcon sx={{ mr: 2 }} />
                  YouTube
                </MenuItem>
                <MenuItem value={"instagram"}>
                  <InstagramIcon sx={{ mr: 2 }} />
                  Instagram
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
              <Button variant="outlined" sx={{ pl: 8, pr: 8 }}>
                SEND 0.0001 ETH
              </Button>
            </Box>
          </Stack>
        </FormControl>
      </Paper>
    </Container>
  );
}
