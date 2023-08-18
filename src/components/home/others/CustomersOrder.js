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
import TableSkeletion from "../../common/Skeletion/TableSkeletion";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
                        <AccessTimeIcon sx={{ width: 14 }} />
                      </Avatar>
                      <Typography>{row.fat}h</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <MoreHorizIcon />
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
