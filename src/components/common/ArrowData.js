import { Box, Typography, alpha, useTheme } from "@mui/material";
import React from "react";

import { TrendingUp, TrendingDown } from "@styled-icons/evaicons-solid";

const ArrowData = ({ totalNum, direction, numDirection }) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Typography sx={{ fontWeight: "semiBold", fontSize: "1.125em" }}>
        {totalNum}
      </Typography>
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
            direction ? theme.palette.text.onStatus : theme.palette.text.active
          }
        >
          {(direction ? "+" : "-") + numDirection}
        </Typography>
        {direction ? (
          <TrendingUp
            width={14}
            color={
              direction
                ? theme.palette.text.onStatus
                : theme.palette.text.active
            }
          />
        ) : (
          <TrendingDown
            width={14}
            color={
              direction
                ? theme.palette.text.onStatus
                : theme.palette.text.active
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default ArrowData;
