import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar></Sidebar>
    </Box>
  );
};

export default Layout;
