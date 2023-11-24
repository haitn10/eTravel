import { Box, Typography, alpha, useTheme, Skeleton } from "@mui/material";
import React from "react";

const ArrowData = ({ loading, totalNum, direction, numDirection }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      padding={1}
    >
      {loading ? (
        <Skeleton width={50} />
      ) : (
        <Typography variant="h5" fontWeight="semiBold">
          {totalNum}
        </Typography>
      )}

      {loading ? (
        <Skeleton width={50} />
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          bgcolor={alpha(
            direction ? theme.palette.text.onStatus : theme.palette.text.active,
            0.1
          )}
          paddingX={1}
          borderRadius={10}
          color={
            direction ? theme.palette.text.onStatus : theme.palette.text.active
          }
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: ".75em",
            }}
            color={
              direction
                ? theme.palette.text.onStatus
                : theme.palette.text.active
            }
          >
            {(direction ? "+" : "-") + numDirection}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ArrowData;
