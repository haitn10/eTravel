import { Box, useTheme } from "@mui/material";
import React from "react";

const ChartCard = () => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.background.secondary}
      borderRadius={2.5}
      padding={2}
      width="100%"
    >
      Chart
    </Box>
  );
};

export default ChartCard;
