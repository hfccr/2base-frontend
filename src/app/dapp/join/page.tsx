"use client";
import ProfileBalanceCheck from "@/components/ProfileBalanceCheck";
import ReclaimRequest from "@/components/ReclaimRequest";
import {
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Divider,
} from "@mui/material";
import Link from "next/link";

export default function Page() {
  return (
    <Container sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/join">Join</Link>
        </Breadcrumbs>
        <Typography variant="h2">Join Base</Typography>
        <Divider />
        <ProfileBalanceCheck />
        {/* <ReclaimRequest /> */}
      </Stack>
    </Container>
  );
}
