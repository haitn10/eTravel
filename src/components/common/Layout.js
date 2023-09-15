import React from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import SidebarApp from "./sidebar";

const Layout = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 800px)");

  return (
    <Box display={isNonMobile ? "flex" : "block"} minHeight="100vh">
      <SidebarApp />
      <Box flexGrow={1} sx={{ background: theme.palette.background.secondary }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
