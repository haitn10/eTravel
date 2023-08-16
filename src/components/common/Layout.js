import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Layout = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 800px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth={isNonMobile ? "300px" : "75px"}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box
        flexGrow={1}
        sx={{ background: theme.palette.background.secondary }}
        height="100%"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
