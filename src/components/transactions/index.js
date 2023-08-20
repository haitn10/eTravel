import { Box, useTheme } from "@mui/material";
import React from "react";

const TransactionsPage = () => {
  const theme = useTheme();
  return (
    <Box
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    ></Box>
  );
};

export default TransactionsPage;
