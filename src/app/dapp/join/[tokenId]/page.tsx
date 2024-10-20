"use client";
import TokenInfo from "@/components/TokenInfo";
import ViewToken from "@/components/ViewToken";
import {
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Divider,
} from "@mui/material";
import Link from "next/link";

interface PageProps {
  params: {
    tokenId: string;
  };
}

export default function Page({ params }: PageProps) {
  const tokenId = params.tokenId;
  return (
    <Container sx={{ mt: 2 }}>
      <Stack spacing={2}>
        {/* <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/join">Join</Link>
        </Breadcrumbs>
        <Typography variant="h2">Join Base</Typography> */}
        {/* <Divider /> */}
        {/* <ReclaimRequest /> */}
        <TokenInfo tokenId={parseInt(tokenId)} />
      </Stack>
    </Container>
  );
}
