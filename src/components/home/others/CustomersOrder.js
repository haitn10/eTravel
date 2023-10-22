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
import { Link } from "react-router-dom";

const CustomersOrder = ({ loadings, rows }) => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.background.secondary}
      borderRadius={2.5}
      padding={2}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontWeight: "semiBold",
            fontSize: "1.5em",
            paddingY: 1.25,
          }}
        >
          Customer Orders
        </Typography>
        <Link to={"/transactions"} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontWeight: "semiBold",
              fontSize: "0.75em",
              marginRight: 1.25,
              color: theme.palette.text.active,
            }}
          >
            Show More
          </Typography>
        </Link>
      </Box>
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
              rows.map((row, index) => {
                return (
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
                      <Avatar src={row.customerImage} />
                      {row.customerName}
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
                        <Typography>{}h</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <MoreHoriz width={24} />
                    </TableCell>
                  </TableRow>
                );
              })
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
