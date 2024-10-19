import { Stack, Chip, Avatar, Paper, Box, IconButton } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
export default function Footer() {
  return (
    <Box
      sx={{
        ml: 1,
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      <Paper variant="outlined">
        <Stack direction="row" spacing={2} sx={{ padding: 2 }}>
          <Chip
            sx={{ fontSize: "large", backgroundColor: "transparent" }}
            avatar={
              <Avatar
                alt="Based India"
                src="https://based-india.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F8b6f3a95cc864974be1aa571c378cd5b%2Fassets%2Ffavicon%2F831.png&w=1440&q=75"
              />
            }
          />
          <Chip
            label="Base"
            sx={{ fontSize: "large" }}
            avatar={
              <Avatar
                alt="Base"
                src="https://www.base.org/_next/static/media/logo.f6fdedfc.svg"
              />
            }
          />
          <Chip
            label="OnchainKit"
            sx={{ fontSize: "large" }}
            avatar={
              <Avatar
                alt="OnchainKit"
                src="https://onchainkit.xyz/favicon/48x48.png?v4-19-24"
              />
            }
          />
          <Chip
            label="Basenames"
            sx={{ fontSize: "large" }}
            avatar={
              <Avatar
                alt="Basenames"
                src="https://www.base.org/_next/static/media/4.40019cd0.svg"
              />
            }
          />
          <Chip
            label="zkTLS"
            sx={{ fontSize: "large" }}
            avatar={
              <Avatar
                alt="Reclaim Protocol"
                src="https://avatars.githubusercontent.com/u/130321117?s=200&v=4"
              />
            }
          />
        </Stack>
      </Paper>
    </Box>
  );
}
