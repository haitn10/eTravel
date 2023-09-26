import React from "react";
import { Box, useTheme } from "@mui/material";

import Header from "../common/Header";

const StaffDetails = () => {
  const theme = useTheme();
  return (
    <Box
      margin="1.25em"
      padding={2}
      paddingBottom={10}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
      height="94vh"
    >
      <Header
        title={"User Details"}
        subTitle={"Show information of customers."}
        showBack={true}
        showTool={false}
      />
    </Box>
  );
};

export default StaffDetails;
