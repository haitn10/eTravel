import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import TableSkeletion from "../../common/skeletion/TableSkeletion";

const PlaceRank = ({ loading, data }) => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.background.secondary}
      borderRadius={2.5}
      padding={2}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingX={1}
      >
        {loading ? (
          <Skeleton width={100} />
        ) : (
          <Typography fontWeight="semiBold" fontSize={18}>
            Top 10 Ranking Places
          </Typography>
        )}
      </Box>

      <TableContainer>
        <Table
          sx={{
            ".MuiTableCell-head": { color: theme.palette.text.third },
            ".MuiTableCell-root": { padding: 1.25 },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  <Typography fontSize={13} fontWeight="medium">
                    Place Name
                  </Typography>
                )}
              </TableCell>

              <TableCell align="right">
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  <Typography fontSize={13} fontWeight="medium">
                    Total Bookings
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeletion rowsNum={4} columnsNum={3} />
            ) : (
              data.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="left">
                      <Typography fontSize={14}>{item.placeName}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontSize={14}>{item.totalBooking}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlaceRank;
