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
import SendToWeb2 from "@/components/SendToWeb2";

export default function Send() {
  return (
    <Container>
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/send">Send</Link>
        </Breadcrumbs>
        <Typography variant="h2">Send</Typography>
        <Divider />
        <SendToWeb2 />
      </Stack>
    </Container>
  );
}
