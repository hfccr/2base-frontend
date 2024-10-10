"use client";
import { useEffect, useMemo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ColorModeContext } from "@/util/ColorModeContext";
import { brandingLightTheme, brandingDarkTheme } from "@/util/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Paper } from "@mui/material";

import { ReactNode } from "react";

interface ColorModeHandlerProps {
  children: ReactNode;
}

export default function ColorModeHandler({ children }: ColorModeHandlerProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode === true ? "dark" : "light");
  useEffect(() => {
    if (prefersDarkMode === true) {
      setMode("dark");
    } else {
      setMode("light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersDarkMode]);
  const theme = useMemo(() => {
    if (mode === "dark") {
      return brandingDarkTheme;
    } else {
      return brandingLightTheme;
    }
  }, [mode]);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const nextMode = prevMode === "light" ? "dark" : "light";
          return nextMode;
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Paper
          elevation={8}
          square
          sx={{
            paddingTop: 16,
            paddingLeft: 2,
            paddingRight: 2,
            minHeight: "100%",
            flexGrow: 1,
          }}
        >
          <Container>{children}</Container>
        </Paper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
