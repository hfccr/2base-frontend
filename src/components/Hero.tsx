import { Avatar, Box, Chip, Container, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "./Grid";
import Image from "next/image";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Hero() {
  const theme = useTheme();
  const uptoMedium = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Container sx={{ mt: 2 }}>
      <Stack
        direction="row"
        // sx={{ minHeight: "80vh", overflow: "hidden" }}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200",
            fontFamily: "Paytone One",
            // zIndex: 1000,
          }}
        >
          <Image
            src="/bridge.svg"
            alt="logo-image"
            width={uptoMedium ? 64 : 144}
            height={uptoMedium ? 64 : 144}
            priority
          />
          <Typography variant="h1" sx={{ fontFamily: "Paytone One" }}>
            Bring Web2 On Base
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
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
        </Box>
      </Stack>
    </Container>
  );
}
