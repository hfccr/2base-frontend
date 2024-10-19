"use client";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import SendToWeb2 from "@/components/SendToWeb2";
import Image from "next/image";
import { InvitesSent } from "@/components/InvitesSent";
import { INVITE_FEE_LABEL } from "@/util/constants";

export default function Send() {
  return (
    <Container sx={{ mt: 2, pb: 8 }}>
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/send">Invite</Link>
        </Breadcrumbs>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Image src="/envelope.svg" height={64} width={64} alt={"Invite"} />
          <Typography variant="h2">Invite</Typography>
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <Chip label="Invite Web2 On Base" size="medium" />
          </Box>
        </Stack>
        <Divider />
        <Stack direction={{ md: "column", lg: "row" }} spacing={4}>
          <Stack
            direction="column"
            spacing={4}
            sx={{ width: { md: "100%", lg: "60%" } }}
          >
            <InvitesSent />
            <SendToWeb2 />
          </Stack>
          <Stack
            direction="column"
            spacing={4}
            sx={{
              width: { md: "100%", lg: "40%" },
              marginTop: { sm: 4, xs: 4 },
            }}
          >
            <Paper variant="outlined" component="div">
              <Stack spacing={2} sx={{ padding: 2 }}>
                <Typography variant="h6">About Inviting</Typography>
                <Divider sx={{ width: "100%" }} />
                <Typography>
                  Support your favourite web2 creators or your friends by
                  inviting them on Base. Inviting a social profile on Base sends{" "}
                  {INVITE_FEE_LABEL} to the contract which can be claimed by the
                  profile by submitting a zkTLS proof of account ownership. If
                  the invited profile joins Base and creates their token, you
                  will get free mints.
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
