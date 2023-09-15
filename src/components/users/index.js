import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const ManageUsers = () => {
  const theme = useTheme();
  return (
    <Box
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      {/* Title */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
        marginX={2}
      >
        <Box>
          <Typography
            color={theme.palette.text.active}
            fontWeight="bold"
            fontSize={36}
          >
            Manage Transactions
          </Typography>
          <Typography
            color={theme.palette.text.third}
            fontWeight="regular"
            fontSize={18}
          >
            Manage all them completed transactions.
          </Typography>
        </Box>

        {/* Search Box*/}
        <Box display="flex" alignItems="center" gap={1}></Box>
      </Box>
      ManageUsers
    </Box>
  );
};

export default ManageUsers;
