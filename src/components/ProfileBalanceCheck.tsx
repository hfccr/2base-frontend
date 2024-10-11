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
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

export default function ProfileBalanceCheck() {
  return (
    <Container sx={{ textAlign: "center", marginTop: 4 }}>
      <Paper variant="outlined" sx={{ padding: 8 }}>
        <FormControl fullWidth>
          <Stack direction="column" spacing={4}>
            <Stack direction={{ lg: "row", md: "column" }} spacing={4}>
              <Select labelId="platform" id="select-platform" value={"github"}>
                <MenuItem value={"github"}>
                  <GitHubIcon sx={{ mr: 2 }} />
                  GitHub
                </MenuItem>
                <MenuItem disabled value={"x"}>
                  <XIcon sx={{ mr: 2 }} />X (Coming Soon)
                </MenuItem>
                <MenuItem disabled value={"youtube"}>
                  <YouTubeIcon sx={{ mr: 2 }} />
                  YouTube (Coming Soon)
                </MenuItem>
                <MenuItem disabled value={"instagram"}>
                  <InstagramIcon sx={{ mr: 2 }} />
                  Instagram (Coming Soon)
                </MenuItem>
              </Select>
              <TextField
                fullWidth
                label="Profile"
                id="profile"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Box sx={{ textAlign: "center" }}>
              <Button variant="outlined" sx={{ pl: 8, pr: 8 }}>
                Check Claim
              </Button>
            </Box>
          </Stack>
        </FormControl>
      </Paper>
    </Container>
  );
}
