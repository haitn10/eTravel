import {
  Box,
  Tooltip,
  Typography,
  alpha,
  useTheme,
  Skeleton,
} from "@mui/material";
import React from "react";

const ArrowData = ({ loading, totalNum, price, numDirection }) => {
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
        <Tooltip title={totalNum}>
          <Typography variant="h5" fontWeight="semiBold" noWrap>
            {price
              ? `$ ${Number(totalNum)
                  .toFixed(1)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
              : totalNum}
          </Typography>
        </Tooltip>
      )}

      {loading ? (
        <Skeleton width={50} />
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          bgcolor={
            numDirection > 0
              ? alpha(theme.palette.text.onStatus, 0.2)
              : alpha(theme.palette.text.third, 0.1)
          }
          paddingX={1}
          borderRadius={10}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: ".75em",
            }}
            color={
              numDirection
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
