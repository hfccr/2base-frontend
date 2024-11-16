import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useMediaQuery, useTheme } from "@mui/material";
import Market from "./Market";
import Footer from "./Footer";

export default function Hero() {
  const theme = useTheme();
  const uptoMedium = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Container sx={{ mt: 2, paddingBottom: 18 }}>
      <Paper variant="outlined" sx={{ padding: 2, marginBottom: 2 }}>
        <Typography>
          Pump your favourite web2 creators and friends by creating a fair
          launch token linked to their profile
        </Typography>
      </Paper>
      <Stack
        direction="row"
        // sx={{ minHeight: "80vh", overflow: "hidden" }}
        justifyContent="center"
        alignItems="center"
      >
        {/* <Box
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
        </Box> */}
      </Stack>
      <Market />
      <Footer />
    </Container>
  );
}
