import React, { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "@/util/ColorModeContext";
import { Fab } from "@mui/material";

export default function ToggleColorMode() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Fab
      sx={{ ml: 1, position: "fixed", bottom: 32, right: 32 }}
      onClick={colorMode.toggleColorMode}
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </Fab>
  );
}
