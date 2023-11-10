import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import React from "react";
import TableSkeletion from "../../common/skeletion/TableSkeletion";

const CountryRanking = ({ loadings, rows }) => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={theme.palette.background.secondary}
      borderRadius={2.5}
      padding={2}
    >
      <TableContainer>
        <Table
          sx={{
            minWidth: 350,
            ".MuiTableCell-head": { color: theme.palette.text.third },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Ratio&nbsp;(%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadings ? (
              rows.map((row) => (
                <TableRow
                  key={row.name}
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
                      fontWeight: "semiBold",
                    }}
                  >
                    <Avatar src={row.icon} />
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="right">{row.ratio}</TableCell>
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

export default CountryRanking;
