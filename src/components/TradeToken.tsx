import { useState } from "react";
import { MarketType } from "@/util/MarketType";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Paper } from "@mui/material";
import Buy from "./Buy";
import Sell from "./Sell";

export default function TradeToken({ tokenInfo }: { tokenInfo: MarketType }) {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper variant="outlined">
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Buy" />
          <Tab label="Sell" />
        </Tabs>
      </Box>
      {value === 0 && <Buy tokenInfo={tokenInfo} />}
      {value === 1 && <Sell tokenInfo={tokenInfo} />}
    </Paper>
  );
}
