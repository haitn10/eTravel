import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import TableSkeletion from "../../common/skeletion/TableSkeletion";
import { TimeFive } from "@styled-icons/boxicons-regular/TimeFive";
import { MoreHoriz } from "@styled-icons/material-outlined";

const CustomersOrder = ({ loadings, rows }) => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.background.secondary}
      borderRadius={2.5}
      padding={2}
    >
      <Typography
        sx={{
          fontWeight: "semiBold",
          fontSize: "1.5em",
          paddingY: 1.25,
        }}
      >
        Customer Orders
      </Typography>
      <TableContainer>
        <Table
          sx={{
            minWidth: 350,
            ".MuiTableCell-head": { color: theme.palette.text.third },
          }}
          aria-label="simple table"
        >
          <TableBody>
            {loadings ? (
              rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar src="" />
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography textTransform="capitalize">
                        {row.carbs}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "inherit",
                          color: theme.palette.text.primary,
                          width: 30,
                        }}
                      >
                        <TimeFive width={14} />
                      </Avatar>
                      <Typography>{row.fat}h</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <MoreHoriz width={24} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableSkeletion rowsNum={3} columnsNum={3} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomersOrder;
