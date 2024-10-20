import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { baseSepolia } from "viem/chains";

const chain = baseSepolia;

interface ViewTokenProps {
  address: string;
}

export default function ViewToken({ address }: ViewTokenProps) {
  const title = "Token Address";
  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">{title}</Typography>
        <TextField disabled value={address} />
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            startIcon={<OpenInNewIcon />}
            variant="outlined"
            color="secondary"
            href={`${chain.blockExplorers.default.url}/address/${address}`}
            target="_blank"
          >
            Explorer
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
