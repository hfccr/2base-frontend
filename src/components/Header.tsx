"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleColorMode from "@/components/ToggleColorMode";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Connect from "./Connect";
import { usePathname } from "next/navigation";
import { hexToRgb } from "@/util/hexToRgb";
import { motion } from "framer-motion";
import Image from "next/image";
import Points from "./Points";
import axios from "axios";

type PageType = {
  title: string;
  href: string;
};

const pages: PageType[] = [];

export default function Header() {
  const pathname = usePathname();
  const selectedIndex = pages.findIndex(
    (page) => pathname.indexOf(page.href) >= 0
  );
  const isHome = pathname === "/";
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const theme = useTheme();
  const uptoMedium = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="fixed"
        color="inherit"
        sx={{
          padding: 1,
          backdropFilter: "blur(8px)",
          backgroundColor: hexToRgb(theme.palette.background.default, 0.8),
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ flexGrow: 1 }}
              >
                <Link href="/" legacyBehavior>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        display: {
                          xs: "block",
                          sm: "block",
                          md: "block",
                          lg: "block",
                        },
                        paddingTop: 0,
                        cursor: "pointer",
                      }}
                    >
                      <motion.div
                        className="container"
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{
                          scale: 0.8,
                          rotate: -40,
                          borderRadius: "100%",
                        }}
                        initial={{ scale: 0.4 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                      >
                        <Image
                          src="/link.svg"
                          alt="link"
                          width={uptoMedium ? 32 : 56}
                          height={uptoMedium ? 32 : 56}
                          priority
                        />
                      </motion.div>
                    </Box>
                    <Box
                      sx={{
                        visibility: !isHome ? "hidden" : "visible",
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          cursor: "pointer",
                          display: {
                            xs: "none",
                            sm: "none",
                            md: "none",
                            lg: "flex",
                          },
                        }}
                      >
                        link.fun
                      </Typography>
                      <Typography
                        variant="h3"
                        component="div"
                        sx={{
                          cursor: "pointer",
                          display: { xs: "none", md: "flex", lg: "none" },
                        }}
                      >
                        link.fun
                      </Typography>
                    </Box>
                  </Stack>
                </Link>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "none" } }}>
                  <IconButton
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    size="large"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <Link key={page.href} href={page.href} legacyBehavior>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">
                            {page.title}
                          </Typography>
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </Box>
                <Typography
                  variant="h4"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "flex", md: "none" },
                    mr: 2,
                    flexGrow: 1,
                  }}
                >
                  link.fun
                </Typography>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "flex", sm: "none" },
                    mr: 1,
                    flexGrow: 1,
                  }}
                >
                  link.fun
                </Typography>
                {/* <Box
                  sx={{
                    flexGrow: 1,
                    display: {
                      xs: "none",
                      md: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                >
                  {pages.map((page, pageIndex) => (
                    <Link key={page.href} href={page.href} legacyBehavior>
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{
                          type: "tween",
                          stiffness: 400,
                          damping: 10,
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          onClick={handleCloseNavMenu}
                          color="inherit"
                          sx={{
                            my: 4,
                            display: "block",
                            mx: { md: 0, lg: 2 },
                            fontSize: "x-large",
                          }}
                          size="large"
                          variant={
                            selectedIndex === pageIndex ? "outlined" : "text"
                          }
                        >
                          {page.title}
                        </Button>
                      </motion.div>
                    </Link>
                  ))}
                </Box> */}
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Box sx={{ minWidth: 180, textAlign: "center" }}>
                  <Connect />
                </Box>
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Points />
      <ToggleColorMode />
    </Box>
  );
}
