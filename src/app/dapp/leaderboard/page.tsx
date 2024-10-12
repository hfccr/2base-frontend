"use client";
import {
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import InviteeTable from "@/components/InviteeLeaderTable";
import InvitedTable from "@/components/InvitedLeaderTable";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Leaderboard() {
  const [view, setView] = useState('invite');  // Default to 'invite'

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string,
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/dapp/leaderboard">Leaderboard</Link>
        </Breadcrumbs>
        <Typography variant="h2">Leaderboard</Typography>
        <Divider />
        
        {/* Toggle Button Group */}
        <div className="flex justify-center">
          <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={handleChange}
            aria-label="Invite vs Invited"
          >
            <ToggleButton value="invite">Invitee</ToggleButton>
            <ToggleButton value="invited">Invited</ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Conditional Rendering of Tables */}
        {view === 'invite' ? <InviteeTable /> : <InvitedTable />}
      </Stack>
    </Container>
  );
}
