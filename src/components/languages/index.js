import { Box, useTheme } from "@mui/material";
import React from "react";
import Header from "../common/Header";

const ManageLanguages = () => {
  const theme = useTheme();
  return (
    <Box
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      <Header
        title={"Manage Languages"}
        subTitle={"Manage all them existing languages or update status."}
        showBack={false}
        showSearch={true}
        showFilter={false}
        buttonAdd={true}
      />
    </Box>
  );
};

export default ManageLanguages;
