import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";
import { Container, CssBaseline } from "@mui/material";
import { getConfig } from "../wagmi";
import { Providers } from "./providers";
import Header from "@/components/Header";
import ColorModeHandler from "@/components/ColorModeHandler";
import "@fontsource-variable/unbounded";
import "@fontsource/syncopate";
import "@fontsource/paytone-one";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2based",
  description: "Bring Web2 To Base",
};

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie")
  );
  return (
    <html lang="en">
      <body>
        <ColorModeHandler>
          <CssBaseline />
          <Providers initialState={initialState}>
            <Header />
            <Container>{props.children}</Container>
          </Providers>
        </ColorModeHandler>
      </body>
    </html>
  );
}
