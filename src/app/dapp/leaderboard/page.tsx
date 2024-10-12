"use client";
import {
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Leaderboard() {
  return (
    <Container sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/leaderboard">Leaderboard</Link>
        </Breadcrumbs>
        <Typography variant="h2">Leaderboard</Typography>
        <Divider />
      </Stack>
    </Container>
  );
}
