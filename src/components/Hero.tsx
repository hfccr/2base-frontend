import { Box, Container, Stack } from "@mui/material";
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
        sx={{ minHeight: "80vh", overflow: "hidden" }}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "200",
            fontFamily: "Paytone One",
            zIndex: 1000,
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
            Bring
          </Typography>
          <Typography variant="h1" sx={{ fontFamily: "Paytone One" }}>
            Web2
          </Typography>
          <Typography variant="h1" sx={{ fontFamily: "Paytone One" }}>
            On Base
          </Typography>
        </Box>
        <Grid />
      </Stack>
    </Container>
  );
}
