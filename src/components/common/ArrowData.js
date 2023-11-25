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
          {totalNum.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
            numDirection > 0
              ? theme.palette.text.onStatus
              : theme.palette.text.third,
            0.1
          )}
          paddingX={1}
          borderRadius={10}
          color={
            numDirection > 0
              ? theme.palette.text.onStatus
              : theme.palette.text.third
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
            {(numDirection > 0 ? "+" : "") + numDirection}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ArrowData;
