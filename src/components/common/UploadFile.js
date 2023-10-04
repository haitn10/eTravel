import { Box, alpha, useTheme } from "@mui/material";
import React from "react";

import { CloudUploadOutline } from "@styled-icons/evaicons-outline";

const UploadFile = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      position="relative"
      border={1}
      borderRadius={2.5}
      borderColor={alpha(theme.palette.text.primary, 0.28)}
      height={40}
    >
      <label
        htmlFor="file"
        style={{
          color: theme.palette.text.third,
          width: "100%",
          cursor: "pointer",
        }}
      >
        <CloudUploadOutline height={24} style={{ margin: 10 }} />
        Import File .JSON
        <input
          id="file"
          style={{
            opacity: 0,
            position: "absolute",
          }}
          accept=".json"
          type="file"
        />
      </label>
    </Box>
  );
};

export default UploadFile;
