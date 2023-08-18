import { Box, Typography, alpha, useTheme } from "@mui/material";
import React from "react";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

const ArrowData = ({ totalNum, direction, numDirection }) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Typography sx={{ fontWeight: "semiBold", fontSize: "1.5em" }}>
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
        paddingX={2}
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
          <TrendingUpRoundedIcon
            sx={{ width: 14 }}
            color={
              direction
                ? theme.palette.text.onStatus
                : theme.palette.text.active
            }
          />
        ) : (
          <TrendingDownRoundedIcon
            sx={{ width: 14 }}
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
